import express from 'express';
import morgan from 'morgan';

import allowCors from './middlewares/cors';
import deleteTempFiles from './middlewares/deleteTempFiles';

import routes from './routes';

class App {
  constructor() {
    // this.nodeEnv = process.env.NODE_ENV;
    // this.subDirectory = process.env.SUBDIRECTORY;

    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    deleteTempFiles();
    this.server.use(express.json());
    this.server.use(allowCors);

    this.server.use(
      morgan(`[:date] - :method [:status] :url - :response-time ms`)
    );
  }

  routes() {
    this.server.use('/api', routes);
    // this.server.use(`${this.subDirectory}/v2`, apiRoutesV2);
  }
}

export default new App().server;
