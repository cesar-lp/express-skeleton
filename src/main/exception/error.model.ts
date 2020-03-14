import moment from 'moment';

export class Exception {
  error: string;
  statusCode: number;
  message: string;
  timestamp: string;

  constructor(statusCode: number, message: string) {
    this.error = this.getStatusCodeError(statusCode);
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = moment().format();
  }

  private getStatusCodeError(statusCode: number) {
    let error: string;

    switch (statusCode) {
      case 400:
        error = 'Bad Request';
        break;
      case 401:
        error = 'Unauthorized';
        break;
      case 404:
        error = 'Resource Not Found';
        break;
      case 422:
        error = 'Validation Error';
        break;
      default:
        error = 'Internal Server Error';
        break;
    }

    return error;
  }
}

export class FieldError {
  field: string;
  message: string;
  invalidValue: any;

  constructor(field: string, message: string, invalidValue: any) {
    this.field = field;
    this.message = message;
    this.invalidValue = invalidValue !== undefined ? invalidValue : null;
  }
}

export class ServiceException extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class InvalidEntityException extends Exception {
  fieldErrors: FieldError[] = [];
  path: string;

  constructor(fieldErrors: FieldError[], path: string) {
    super(422, 'There are invalid fields');
    this.fieldErrors = fieldErrors;
    this.path = path;
  }
}
