import express, { Request, Response } from 'express';

import personService from '../service/person.service';
import { validatePerson } from './../domain/person.model';
import { validate } from '../exception/error.handler';

const router = express.Router();

router.get('', async (_req: Request, res: Response) => {
  const people = await personService.getAll();
  res.status(200).send(people);
});

router.post('', validatePerson(), validate, async (req: Request, res: Response) => {
  const createdPerson = await personService.create(req.body);
  res.status(201).send(createdPerson);
});

export default router;
