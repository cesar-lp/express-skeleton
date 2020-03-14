import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { Exception, ServiceException, FieldError, InvalidEntityException } from './error.model';

export const handleError = (err: Error, _req: Request, res: Response) => {
  const error = err as ServiceException;
  const statusCode = error.statusCode || 400;
  const response = new Exception(statusCode, error.message);
  return res.status(statusCode).json(response);
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const requestUrl = req.baseUrl + (req.path !== '/' ? req.path : '');
  const fieldErrors: FieldError[] = [];

  errors.array().map((err: ValidationError) => {
    fieldErrors.push(new FieldError(err.param, err.msg, err.value));
  });

  return res.status(422).json(new InvalidEntityException(fieldErrors, requestUrl));
};
