import { ValidationError } from 'express-validator';

export const mockPathVariableError = (): ValidationError => {
  return { location: 'params', param: 'id', msg: 'Must be a positive number', value: -1 };
};

export const mockQueryParamError = (): ValidationError => {
  return { location: 'query', param: 'sort', msg: 'Sort must be either ASC or DESC', value: -1 };
};

export const mockReqBodyFieldError = (): ValidationError => {
  return { location: 'body', param: 'name', msg: 'Name is required', value: -1 };
};

export default { mockPathVariableError, mockQueryParamError, mockReqBodyFieldError };
