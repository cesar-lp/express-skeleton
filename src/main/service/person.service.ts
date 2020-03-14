import Person from '../domain/person.model';
import Company from '../domain/company.model';

const getAll = async () => {
  return [
    new Person(1, 'Elon Musk', [
      new Company(1, 'Tesla'),
      new Company(2, 'SpaceX'),
      new Company(3, 'Neuralink'),
      new Company(4, 'The Boring Company'),
      new Company(5, 'Solar City'),
    ]),
    new Person(2, 'Bill Gates', [new Company(1, 'Microsoft')]),
  ];
};

const create = async (newPerson: Person) => {
  newPerson.id = Math.ceil((1.01 - Math.random()) * 100);
  return newPerson;
};

export default { getAll, create };
