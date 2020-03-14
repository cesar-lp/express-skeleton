import { body, param } from 'express-validator';

const invalidIdentifier = [
  param('id')
    .isUUID()
    .withMessage('Value is not an UUID'),
];

const getPerson = [...invalidIdentifier];

const createPerson = [
  body('name')
    .exists()
    .withMessage('Name is required'),
];

const updatePerson = [
  ...invalidIdentifier,
  body('name')
    .exists()
    .withMessage('Name is required'),
];

const deletePerson = [...invalidIdentifier];

export default { getPerson, createPerson, updatePerson, deletePerson };
