import { Router } from 'express';

import ProntuarioController from './ProntuarioController';

const routes = new Router();

routes.get('/', ProntuarioController.getAll);
routes.get('/:id', ProntuarioController.getById);
routes.post('/,', ProntuarioController.create);
routes.put('/:id', ProntuarioController.update);
routes.delete('/:id', ProntuarioController.delete);
routes.delete('/:id/email', ProntuarioController.delete);

export default routes;
