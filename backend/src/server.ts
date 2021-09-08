import 'reflect-metadata';
import "express-async-errors";
import express, { Request, Response, NextFunction } from 'express';

import routes from './routes';

import './database';
import CustomError from './class/CustomError';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: CustomError, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(typeof err.status === 'undefined' ? 500 : err.status).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
