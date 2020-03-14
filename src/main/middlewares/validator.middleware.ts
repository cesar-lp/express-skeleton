import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult, ValidationError } from 'express-validator';
import { ErrorFactory, InvalidValueError, ValidationException } from '../exception/error.model';
import { extractRequestUrl } from '../utils/http.utils';

const extractErrorsFrom = (validationErrors: ValidationError[], location: string) => {
  return validationErrors.filter((err: ValidationError) => err.location === location);
};

const validateRequestPathVariables = (validationErrors: ValidationError[], path: string) => {
  const errors = extractErrorsFrom(validationErrors, 'params').map((err: ValidationError) =>
    ErrorFactory.pathVariableError(err.param, err.msg, err.value),
  );

  if (errors.length > 0) {
    throw new ValidationException(errors, path, 400, 'Request URI contains invalid values');
  }
};

const validateRequestParams = (validationErrors: ValidationError[], path: string) => {
  const errors: InvalidValueError[] = [];

  validationErrors
    .filter((err: ValidationError) => err.location === 'query')
    .map((err: ValidationError) => {
      errors.push(ErrorFactory.queryParamError(err.param, err.msg, err.value));
    });

  if (errors.length > 0) {
    throw new ValidationException(errors, path, 400, 'Request URI contains invalid values');
  }
};

const validateRequestBody = (validationErrors: ValidationError[], path: string) => {
  const errors = extractErrorsFrom(validationErrors, 'body').map((err: ValidationError) =>
    ErrorFactory.requestBodyError(err.param, err.msg, err.value),
  );

  if (errors.length > 0) {
    throw new ValidationException(errors, path);
  }
};

const validateReq = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    next();
  }

  const errors = validationErrors.array();
  const path = extractRequestUrl(req);

  validateRequestPathVariables(errors, path);
  validateRequestParams(errors, path);
  validateRequestBody(errors, path);
});

export default validateReq;
