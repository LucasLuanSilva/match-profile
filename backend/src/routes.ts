import { Router } from 'express';

import CreateCidadeController from './controllers/CreateCidadeController';
import CreateEmpresaController from './controllers/CreateEmpresaController';

const routes = Router();

const createCidadeController = new CreateCidadeController();
const createEmpresaController = new CreateEmpresaController();

routes.post('/cidades', createCidadeController.handle);
routes.post('/empresas', createEmpresaController.handle);

export default routes;
