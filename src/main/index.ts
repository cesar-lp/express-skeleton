import express, { json, Request, Response } from 'express';
import personController from './controller/person.controller';
import { handleError } from './exception/error.handler';

const app = express();
const port = 3000;

app.use(json());
app.use('/people', personController);

app.use((error: Error, req: Request, res: Response) => handleError(error, req, res));

app.listen(port, () => console.log(`App listening on port ${port}!`));
