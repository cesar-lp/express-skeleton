import { ValidationError } from 'express-validator';
import { ErrorFactory, ValidationException } from '../../../main/exception/error.model';

export const mockPathVariableValidationException = (err: ValidationError) => {
  const error = ErrorFactory.pathVariableError(err.param, err.msg, err.value);
  return new ValidationException([error], '/people', 400, 'Request URI contains invalid values');
};

export const mockQueryParamValidationException = (err: ValidationError) => {
  const error = ErrorFactory.queryParamError(err.param, err.msg, err.value);
  return new ValidationException([error], '/people', 400, 'Request URI contains invalid values');
};

export const mockReqBodyValidationException = (err: ValidationError) => {
  const error = ErrorFactory.requestBodyError(err.param, err.msg, err.value);
  return new ValidationException([error], '/people', 422, "Request body isn't complete or contains invalid fields");
};

export default {
  mockPathVariableValidationException,
  mockQueryParamValidationException,
  mockReqBodyValidationException,
};
