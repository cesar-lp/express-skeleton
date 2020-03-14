import { Person } from '../models/index';
import { ServiceError } from '../exception/error.model';
import PersonRepository from '../repository/person.repository';

export default interface PersonService {
  getById(id: string): Person;
  getAll(): Person[];
  create(person: Person): Person;
  update(id: string, person: Person): Person;
  deleteById(id: string): void;
}

export class PersonServiceImpl implements PersonService {
  personRepository: PersonRepository;

  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  getById(id: string): Person {
    const p = this.personRepository.findById(id);

    if (!p) {
      throw new ServiceError(404, `Person not found for id ${id}`);
    }

    return p;
  }

  getAll(): Person[] {
    return this.personRepository.findAll();
  }

  create(person: Person): Person {
    return this.personRepository.create(person);
  }

  update(id: string, person: Person): Person {
    const p = this.personRepository.update(id, person);

    if (!p) {
      throw new ServiceError(404, `Person not found for id ${id}`);
    }

    return p;
  }

  deleteById(id: string): void {
    const modifiedRows = this.personRepository.deleteById(id);

    if (modifiedRows === 0) {
      throw new ServiceError(404, `Person not found for id ${id}`);
    }
  }
}
