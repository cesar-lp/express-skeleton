import morgan from 'morgan';
import { ApplicationConfig } from './../config/application.config';
import express, { json, Request, Response, NextFunction } from 'express';
import swagger, { SwaggerOptions } from 'swagger-ui-express';
import Controller from '../controllers/controller';
import swaggerSpec from '../config/swagger.config';
import { handleError } from '../exception/error.handler';
import { ServiceException } from '../exception/error.model';
import { extractRequestUrl } from '../utils/http.utils';
import logger, { standardLog } from '../utils/logging.utils';

export default class Application {
  server: express.Express;
  environment: string;
  port: number;

  constructor(controllers: Controller[], config: ApplicationConfig) {
    this.server = express();
    this.port = config.port;
    this.environment = config.environment;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public async listen() {
    return this.server.listen(this.port, (error: Error) => {
      if (error) logger.error(error);
      logger.info(`App started on ${this.environment}, listening on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.initializeSwagger();

    this.server.use(json());
    this.server.use(standardLog(morgan));
  }

  private initializeSwagger() {
    const swaggerOpts: SwaggerOptions = {
      swaggerOptions: {
        validatorUrl: null,
      },
      explorer: true,
    };

    this.server.use('/api-docs', swagger.serve, swagger.setup(swaggerSpec, swaggerOpts));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(ctrl => this.server.use(`/api${ctrl.path}`, ctrl.router));

    this.server.use((req: Request, res: Response, _next: NextFunction) => {
      res.status(404).send(new ServiceException(404, 'Requested endpoint does not exist', extractRequestUrl(req)));
    });

    this.server.use((err: Error, req: Request, res: Response, _next: NextFunction) => handleError(err, req, res));
  }
}
