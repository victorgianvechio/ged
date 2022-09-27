import { Router } from 'express';
import multer from 'multer';

import ProntuarioController from './ProntuarioController';
import multerConfig from '../../config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', ProntuarioController.index);
routes.get('/:id', ProntuarioController.getByProntuario);
routes.get('/advanced-search', ProntuarioController.advancedSearch);
routes.post('/', ProntuarioController.storeTest);
routes.post(
  '/prontuario-upload',
  upload.single('file'),
  ProntuarioController.store
);

// routes.put('/:id', ProntuarioController.update);
// routes.delete('/:id', ProntuarioController.delete);
// routes.delete('/:id/email', ProntuarioController.delete);

export default routes;
