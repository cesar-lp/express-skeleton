import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import Controller from './controller';
import PersonService from '../services/person.service';
import validations from '../validations/person.validations';
import validateReq from '../middlewares/validator.middleware';

/**
 * @swagger
 * path:
 *  /people:
 *    get:
 *      summary: Returns a list of people with their companies
 *      tags: [Person]
 *      responses:
 *        "200":
 *          description: A list of person is successfully returned
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *    post:
 *      summary: Creates a new person
 *      tags: [Person]
 *      responses:
 *        "201":
 *          description: Person successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        "422":
 *          description: Request body has missing or invalid fields
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ValidationException'
 */
export class PersonController implements Controller {
  path = '/people';
  router = Router();
  personService: PersonService;

  constructor(personService: PersonService) {
    this.personService = personService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('', asyncHandler(this.getAll));
    this.router.get('/:id', validations.getPerson, validateReq, asyncHandler(this.getOne));
    this.router.post('', validations.createPerson, validateReq, asyncHandler(this.create));
    this.router.put('/:id', validations.updatePerson, validateReq, asyncHandler(this.update));
    this.router.delete('/:id', validations.deletePerson, validateReq, asyncHandler(this.deleteOne));
  }

  getAll = async (_req: Request, res: Response) => {
    const people = this.personService.getAll();
    res.status(200).send(people);
  };

  getOne = async (req: Request, res: Response) => {
    const person = this.personService.getById(req.params.id);
    res.status(200).send(person);
  };

  create = async (req: Request, res: Response) => {
    const createdPerson = this.personService.create(req.body);
    res.status(201).send(createdPerson);
  };

  update = async (req: Request, res: Response) => {
    const updatedPerson = this.personService.update(req.params.id, req.body);
    res.status(200).send(updatedPerson);
  };

  deleteOne = async (req: Request, res: Response) => {
    this.personService.deleteById(req.params.id);
    res.status(204);
  };
}
