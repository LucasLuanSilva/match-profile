import { Router } from 'express';
import AuthenticateUsuarioEmpresarialController from './controllers/AuthenticateUsuarioEmpresarialController';
import CreateCidadeController from './controllers/CreateCidadeController';
import CreateEmpresaController from './controllers/CreateEmpresaController';
import CreateUsuarioEmpresarialController from './controllers/CreateUsuarioEmpresarialController';
import { ensureAuthenticatedEmpresariais } from './middlewares/ensureAuthenticatedEmpresariais';

const routes = Router();

const createCidadeController = new CreateCidadeController();
const createEmpresaController = new CreateEmpresaController();
const createUsuarioEmpresarialController = new CreateUsuarioEmpresarialController();
const authenticateUsuarioEmpresarialController = new AuthenticateUsuarioEmpresarialController();

routes.post('/cidades', createCidadeController.handle);
routes.post('/empresas', createEmpresaController.handle);
routes.post('/usuarios/empresariais', ensureAuthenticatedEmpresariais, createUsuarioEmpresarialController.handle);
routes.post('/login/empresariais', authenticateUsuarioEmpresarialController.handle);

export default routes;
