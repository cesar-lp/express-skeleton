import { v4 as uuidv4 } from 'uuid';
import { Person, Company } from '../models';

export default interface PersonRepository {
  findById(id: string): Person | undefined;
  findAll(): Person[];
  create(person: Person): Person;
  update(id: string, person: Person): Person | undefined;
  deleteById(id: string): number;
}

export class PersonRepositoryImpl implements PersonRepository {
  people: Person[] = [
    new Person(uuidv4(), 'Bill Gates', [new Company(uuidv4(), 'Microsoft')]),
    new Person(uuidv4(), 'Elon Musk', [
      new Company(uuidv4(), 'SpaceX'),
      new Company(uuidv4(), 'Tesla'),
      new Company(uuidv4(), 'The Boring Company'),
      new Company(uuidv4(), 'Solar City'),
      new Company(uuidv4(), 'Neuralink'),
    ]),
  ];

  findById(id: string) {
    return this.people.find(p => p.id === id);
  }

  findAll(): Person[] {
    return this.people;
  }

  create(person: Person): Person {
    person.id = uuidv4();
    this.people.push(person);
    return person;
  }

  update(id: string, person: Person) {
    const index = this.people.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    this.people[index] = person;
    return person;
  }

  deleteById(id: string) {
    const index = this.people.findIndex(p => p.id === id);
    if (index === -1) return 0;
    return this.people.splice(index, 1).length;
  }
}
