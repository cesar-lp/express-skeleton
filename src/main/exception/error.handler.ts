import { Request, Response } from 'express';
import { ServiceException, ServiceError, ValidationException } from './error.model';
import logger from '../utils/logging.utils';
import { extractRequestUrl } from '../utils/http.utils';

export const handleError = (err: Error | ValidationException, req: Request, res: Response) => {
  const errorName = Object.getPrototypeOf(err).constructor.name;
  logger.error(err.message);

  switch (errorName) {
    case 'ServiceError':
      const error = err as ServiceError;
      const serviceExc = new ServiceException(error.statusCode, error.message, extractRequestUrl(req));
      res.status(serviceExc.statusCode).send(serviceExc);
      break;
    case 'ValidationException':
      const valExc = err as ValidationException;
      res.status(valExc.statusCode).send(valExc);
      break;
    default:
      const exc = new ServiceException(500, err.message, extractRequestUrl(req));
      res.status(500).send(exc);
      break;
  }
};
