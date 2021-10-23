import { Router } from 'express';
import AtualizaTabelaCidadesController from './controllers/AtualizaTabelaCidadesController';
import AuthenticateUsuarioController from './controllers/AuthenticateUsuarioController';
import AuthenticateUsuarioEmpresarialController from './controllers/AuthenticateUsuarioEmpresarialController';
import CreateCidadeController from './controllers/CreateCidadeController';
import CreateEmpresaController from './controllers/CreateEmpresaController';
import CreateTelefoneController from './controllers/CreateTelefoneController';
import CreateTelefoneEmpresarialController from './controllers/CreateTelefoneEmpresarialController';
import CreateUsuarioController from './controllers/CreateUsuarioController';
import CreateUsuarioEmpresarialController from './controllers/CreateUsuarioEmpresarialController';
import ListCidadesController from './controllers/ListCidadesController';
import ListUsuariosEmpresariaisController from './controllers/ListUsuariosEmpresariaisController';
import { ensureAuthenticatedEmpresariais } from './middlewares/ensureAuthenticatedEmpresariais';
import { ensureAuthenticatedUsuarios } from './middlewares/ensureAuthenticatedUsuarios';

const routes = Router();

const createCidadeController = new CreateCidadeController();
const createEmpresaController = new CreateEmpresaController();
const createUsuarioEmpresarialController = new CreateUsuarioEmpresarialController();
const authenticateUsuarioEmpresarialController = new AuthenticateUsuarioEmpresarialController();
const createUsuarioController = new CreateUsuarioController();
const authenticateUsuarioController = new AuthenticateUsuarioController();
const listUsuariosEmpresariaisController = new ListUsuariosEmpresariaisController();
const atualizaTabelaCidadesController = new AtualizaTabelaCidadesController();
const listCidadesController = new ListCidadesController();
const createTelefoneController = new CreateTelefoneController();
const createTelefoneEmpresarialController = new CreateTelefoneEmpresarialController();

//// POST
// routes.post('/cidades', createCidadeController.handle);
routes.post('/cidades/atualiza', atualizaTabelaCidadesController.handle);

// CANDIDATO
routes.post('/login', authenticateUsuarioController.handle);
routes.post('/usuarios', createUsuarioController.handle);
routes.post('/telefones', ensureAuthenticatedUsuarios, createTelefoneController.handle);

// EMPRESARIAL
routes.post('/empresas', createEmpresaController.handle);
routes.post('/empresariais/login', authenticateUsuarioEmpresarialController.handle);
routes.post('/empresariais/usuarios', ensureAuthenticatedEmpresariais, createUsuarioEmpresarialController.handle);
routes.post('/empresariais/telefones', ensureAuthenticatedEmpresariais, createTelefoneEmpresarialController.handle);

//// GET
routes.get('/cidades/:uf', listCidadesController.handle);
routes.get('/cidades', listCidadesController.handle);

// CANDIDATO


// EMPRESARIAL
routes.get('/empresariais/usuarios/:id', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);
routes.get('/empresariais/usuarios', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);

export default routes;
