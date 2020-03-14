// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const statusCodeToError = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 404:
      return 'Resource Not Found';
    case 422:
      return 'Validation Error';
    default:
      return 'Internal Server Error';
  }
};

export type InvalidValueError = PathVariableError | QueryParamError | RequestBodyError;

interface PathVariableError {
  pathVariableName: string;
  error: string;
  invalidValue: any;
}

interface QueryParamError {
  paramName: string;
  error: string;
  invalidValue: any;
}

interface RequestBodyError {
  fieldName: string;
  error: string;
  invalidValue: any;
}

export class ServiceError extends Error {
  statusCode: number;

  constructor(statusCode: number, msg: string) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export class ServiceException {
  error: string;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;

  constructor(statusCode: number, message: string, path: string) {
    this.error = statusCodeToError(statusCode);
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = moment().format();
    this.path = path;
  }
}

export class ErrorFactory {
  static pathVariableError(name: string, error: string, invalidValue: any): PathVariableError {
    return {
      pathVariableName: name,
      error: error,
      invalidValue: invalidValue !== undefined ? invalidValue : null,
    };
  }

  static queryParamError(name: string, error: string, invalidValue: any): QueryParamError {
    return {
      paramName: name,
      error: error,
      invalidValue: invalidValue !== undefined ? invalidValue : null,
    };
  }

  static requestBodyError(name: string, error: string, invalidValue: any): RequestBodyError {
    return {
      fieldName: name,
      error: error,
      invalidValue: invalidValue !== undefined ? invalidValue : null,
    };
  }
}

export class ValidationException extends ServiceException {
  errors: InvalidValueError[] = [];

  constructor(errors: InvalidValueError[], path: string, statusCode?: number, error?: string) {
    super(
      statusCode ? statusCode : 422,
      error ? error : "Request body isn't complete or contains invalid fields",
      path,
    );
    this.errors = errors;
  }
}
