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
import DeleteTelefoneController from './controllers/DeleteTelefoneController';
import DeleteUsuarioEmpresarialController from './controllers/DeleteUsuarioEmpresarialController';
import ListCidadesController from './controllers/ListCidadesController';
import ListTelefonesController from './controllers/ListTelefonesController';
import ListTelefonesEmpresariaisController from './controllers/ListTelefonesEmpresariaisController';
import ListUsuariosEmpresariaisController from './controllers/ListUsuariosEmpresariaisController';
import UpdateUsuarioEmpresarialController from './controllers/UpdateUsuarioEmpresarialController';
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
const deleteUsuarioEmpresarialController = new DeleteUsuarioEmpresarialController();
const updateUsuarioEmpresarialController = new UpdateUsuarioEmpresarialController();
const listTelefonesEmpresariaisController = new ListTelefonesEmpresariaisController();
const listTelefonesController = new ListTelefonesController();
const deleteTelefoneController = new DeleteTelefoneController();

//// POST ////
routes.post('/cidades', createCidadeController.handle);
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


//// GET ////
routes.get('/cidades/:uf', listCidadesController.handle);
routes.get('/cidades', listCidadesController.handle);

// CANDIDATO
routes.get('/telefones/:id', ensureAuthenticatedUsuarios, listTelefonesController.handle);


// EMPRESARIAL
routes.get('/empresariais/usuarios/:id', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);
routes.get('/empresariais/usuarios', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);
routes.get('/empresariais/telefones/:id', ensureAuthenticatedEmpresariais, listTelefonesEmpresariaisController.handle);


//// DELETE ////

// CANDIDATO
routes.delete('/telefones/:id', ensureAuthenticatedUsuarios, deleteTelefoneController.handle);

// EMPRESARIAL
routes.delete('/empresariais/usuarios/:id', ensureAuthenticatedEmpresariais, deleteUsuarioEmpresarialController.handle);
routes.delete('/empresariais/telefones/:id', ensureAuthenticatedEmpresariais, deleteTelefoneController.handle);


//// UPDATE ////

// CANDIDATO


// EMPRESARIAL
routes.put('/empresariais/usuarios', ensureAuthenticatedEmpresariais, updateUsuarioEmpresarialController.handle);

export default routes;
