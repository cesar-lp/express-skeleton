import { body } from 'express-validator';

import Company from './company.model';

export const validatePerson = () => {
  return [
    body('name')
      .exists()
      .withMessage('Name is required'),
  ];
};

export default class Person {
  id: number;
  name: string;
  companies: Company[] = [];

  constructor(id: number, name: string, companies: Company[]) {
    this.id = id;
    this.name = name;
    this.companies = companies;
  }
}
