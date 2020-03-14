import { Request } from 'express';
import { ValidationError } from 'express-validator';

export const validatorMiddleware = async (req: Request, res: Response, middlewares: any) => {
  await Promise.all(
    middlewares.map(async (middleware: any) => {
      await middleware(req, res, () => undefined);
    }),
  );
};

export const assertValidationError = (
  error: ValidationError,
  location: string,
  param: string,
  msg: string,
  value: any,
) => {
  expect(error.location).toEqual(location);
  expect(error.param).toEqual(param);
  expect(error.msg).toEqual(msg);
  expect(error.value).toEqual(value);
};

export default { validatorMiddleware, assertValidationError };
