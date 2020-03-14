import { PersonRepositoryImpl } from './repository/person.repository';
import { PersonServiceImpl } from './services/person.service';
import Application from './app/application';
import { PersonController } from './controllers/person.controller';
import * as configuration from './config/application.config';

export let app: Application;

const controllers = [new PersonController(new PersonServiceImpl(new PersonRepositoryImpl()))];

const startServer = async () => {
  const config = await configuration.load();
  app = new Application(controllers, config);
  return app.listen();
};

startServer();
