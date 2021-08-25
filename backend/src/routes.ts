import { Router } from 'express';

import CreateCidadeController from './controllers/CreateCidadeController';

const routes = Router();

const createCidadeController = new CreateCidadeController();

routes.post('/cidades', createCidadeController.handle);

export default routes;
