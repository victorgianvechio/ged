import { Router } from 'express';

import multer from 'multer';
import authMiddleware from './middlewares/auth';
import multerConfig from './config/multer';

import ProntuarioController from './app/controllers/ProntuarioController';

const routes = new Router();

const upload = multer(multerConfig);

// -------------------------------------------------------------------------- //
// ------------------------------- ROTAS LIVRE ------------------------------ //
// -------------------------------------------------------------------------- //

// --------------------------------- DEFAULT ---------------------------------//
routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'GED API is running' });
});

// ------------------------------- PRONTUARIO --------------------------------//

routes.get('/prontuario', ProntuarioController.index);
routes.get('/prontuario/:prontuario', ProntuarioController.getByProntuario);
routes.get('/advanced-search/prontuario', ProntuarioController.advancedSearch);
routes.post('/prontuario', ProntuarioController.storeTest);

routes.post(
  '/prontuario-upload',
  upload.single('file'),
  ProntuarioController.store
);

// -------------------------------------------------------------------------- //
// ------------------ ROTAS QUE NECESSITAM DE AUTENTICAÇÃO ------------------ //
// -------------------------------------------------------------------------- //

routes.use(authMiddleware);

// ---------------------------- DEFAULT COM TOKEN ----------------------------//
routes.get('/auth-token', (req, res) => {
  return res.status(200).json({
    auth: true,
    message: 'GED API is running and token is valid',
  });
});

export default routes;
