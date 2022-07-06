import express from 'express';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';

import sentryConfig from './config/sentry';
import allowCors from './middlewares/cors';
import deleteTempFiles from './utils/deleteTempFiles';

import routes from './api/routes';

class App {
  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    // this.subDirectory = process.env.SUBDIRECTORY;

    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());

    if (this.nodeEnv === 'prod') deleteTempFiles();

    this.server.use(express.json());
    this.server.use(allowCors);
    this.server.use(express.static('./public'));
    this.server.use('/public', express.static('./public'));

    this.server.use(
      morgan(`[:date] - :method [:status] :url - :response-time ms`)
    );
  }

  routes() {
    this.server.use('/api', routes);
    this.server.get('/favicon.ico', (req, res) => res.status(204));
    this.server.use(Sentry.Handlers.errorHandler());
    // this.server.use(`${this.subDirectory}/v2`, apiRoutesV2);
  }
}

export default new App().server;
