import express from 'express';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';

import sentryConfig from './config/sentry';

import prontuarioRoutes from './app/Prontuario/prontuario.routes';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(morgan('dev'));
    this.server.use(express.static('./public'));
    this.server.use('/public', express.static('./public'));
  }

  routes() {
    // Default route
    this.server.get('/api/v1', (req, res) => {
      return res.status(200).json({ message: 'API is running' });
    });

    this.server.use('/api/v1/prontuario', prontuarioRoutes);
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
