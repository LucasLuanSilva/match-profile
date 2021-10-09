import { Router } from 'express';
import AtualizaTabelaCidadesController from './controllers/AtualizaTabelaCidadesController';
import AuthenticateUsuarioController from './controllers/AuthenticateUsuarioController';
import AuthenticateUsuarioEmpresarialController from './controllers/AuthenticateUsuarioEmpresarialController';
import CreateCidadeController from './controllers/CreateCidadeController';
import CreateEmpresaController from './controllers/CreateEmpresaController';
import CreateUsuarioController from './controllers/CreateUsuarioController';
import CreateUsuarioEmpresarialController from './controllers/CreateUsuarioEmpresarialController';
import ListUsuariosEmpresariaisController from './controllers/ListUsuariosEmpresariaisController';
import { ensureAuthenticatedEmpresariais } from './middlewares/ensureAuthenticatedEmpresariais';

const routes = Router();

const createCidadeController = new CreateCidadeController();
const createEmpresaController = new CreateEmpresaController();
const createUsuarioEmpresarialController = new CreateUsuarioEmpresarialController();
const authenticateUsuarioEmpresarialController = new AuthenticateUsuarioEmpresarialController();
const createUsuarioController = new CreateUsuarioController();
const authenticateUsuarioController = new AuthenticateUsuarioController();
const listUsuariosEmpresariaisController = new ListUsuariosEmpresariaisController();
const atualizaTabelaCidadesController = new AtualizaTabelaCidadesController();

routes.post('/cidades', createCidadeController.handle);
routes.post('/empresas', createEmpresaController.handle);
routes.post('/usuarios/empresariais', ensureAuthenticatedEmpresariais, createUsuarioEmpresarialController.handle);
routes.post('/login/empresariais', authenticateUsuarioEmpresarialController.handle);
routes.post('/usuarios', createUsuarioController.handle);
routes.post('/login', authenticateUsuarioController.handle);
routes.post('/cidades/atualiza', atualizaTabelaCidadesController.handle);

routes.get('/usuarios/empresariais/:id', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);
routes.get('/usuarios/empresariais', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);

export default routes;
