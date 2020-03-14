import { Request } from 'express';

export const extractRequestUrl = (req: Request) => {
  return req.baseUrl + (req.path !== '/' ? req.path : '');
};
