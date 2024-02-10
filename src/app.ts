import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import logger from './logger';
import router from './routers/index';
import { Connection } from './data-source';

const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const hostName: string = process.env.HOSTNAME ?? 'localhost';

dotenv.config();
const app:express.Application = express();
app.use(cors());

/**
 * connecting to the database using typeorm
 */
Connection.initialize().then(() => {
  logger.info('Data Source has been initialized!');
}).catch((error) => {
  logger.error('Error:  ', error);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), '/public')));
app.use(express.urlencoded({ extended: true })); // URL parser
app.use('/api', router);

app.get('/', (req:Request, res:Response) => {
  res.status(200).send('Welcome to Express JS');
});

app.listen(port, () => {
  logger.info(`Express server is started at http://${hostName}:${port}`);
});

/**
 *  Error response for unknown route
 */
app.all('*', (req: Request, res: Response) => {
  return res.status(404).json({ status: 404, message: `Can't find ${req.originalUrl} on the server!` });
});
