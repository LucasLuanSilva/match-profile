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
import CreateCurriculoController from './controllers/CreateCurriculoController';
import CreateCursoController from './controllers/CreateCursoController';
import CreateGraduacaoController from './controllers/CreateGraduacaoController';
import CreateExperienciaController from './controllers/CreateExperienciaController';
import DeleteTelefoneController from './controllers/DeleteTelefoneController';
import DeleteCursoController from './controllers/DeleteCursoController';
import DeleteExperienciaController from './controllers/DeleteExperienciaController';
import DeleteGraduacaoController from './controllers/DeleteGraduacaoController';
import DeleteUsuarioEmpresarialController from './controllers/DeleteUsuarioEmpresarialController';
import ListCidadesController from './controllers/ListCidadesController';
import ListTelefonesController from './controllers/ListTelefonesController';
import ListTelefonesEmpresariaisController from './controllers/ListTelefonesEmpresariaisController';
import ListUsuariosEmpresariaisController from './controllers/ListUsuariosEmpresariaisController';
import ListUsuariosController from './controllers/ListUsuariosController';
import ListCursosController from './controllers/ListCursosController';
import ListGraduacaoController from './controllers/ListGraduacaoController';
import ListExperienciasController from './controllers/ListExperienciasController';
import UpdateTelefoneController from './controllers/UpdateTelefoneController';
import UpdateCursoController from './controllers/UpdateCursoController';
import UpdateExperienciaController from './controllers/UpdateExperienciaController';
import UpdateGraduacaoController from './controllers/UpdateGraduacaoController';
import UpdateUsuarioEmpresarialController from './controllers/UpdateUsuarioEmpresarialController';
import { ensureAuthenticatedEmpresariais } from './middlewares/ensureAuthenticatedEmpresariais';
import { ensureAuthenticatedUsuarios } from './middlewares/ensureAuthenticatedUsuarios';
import ListTestesEmpresariaisController from './controllers/ListTestesEmpresariaisController';
import ListTestesAtribuidosController from './controllers/ListTestesAtribuidosController';
import CreateTesteController from './controllers/CreateTesteController';
import ListQuestoesController from './controllers/ListQuestoesController';
import DeleteTesteController from './controllers/DeleteTesteController';
import ListVagasEmpresariaisController from './controllers/ListVagasEmpresariaisController';
import ListVagasController from './controllers/ListVagasController';
import CreateVagaController from './controllers/CreateVagaController';
import UpdateVagaController from './controllers/UpdateVagaController';
import DeleteVagaController from './controllers/DeleteVagaController';
import DeleteVagaTesteController from './controllers/DeleteVagaTesteController';
import ListVagasTestesController from './controllers/ListVagasTestesController';
import CreateVagaTesteController from './controllers/CreateVagaTesteController';
import CreateCandidatoController from './controllers/CreateCandidatoController';
import CreateTesteAtribuidoController from './controllers/CreateTesteAtribuidoController';
import ListCandidatosController from './controllers/ListCandidatosController';
import { ensureAuthenticatedEmpresariaisNivel } from './middlewares/ensureAuthenticatedEmpresariaisNivel';

const routes = Router();

const createCidadeController = new CreateCidadeController();
const createEmpresaController = new CreateEmpresaController();
const createUsuarioEmpresarialController = new CreateUsuarioEmpresarialController();
const authenticateUsuarioEmpresarialController = new AuthenticateUsuarioEmpresarialController();
const createUsuarioController = new CreateUsuarioController();
const createCurriculoController = new CreateCurriculoController();
const createCursoController = new CreateCursoController();
const createGraduacaoController = new CreateGraduacaoController();
const createExperienciaController = new CreateExperienciaController();
const authenticateUsuarioController = new AuthenticateUsuarioController();
const listUsuariosEmpresariaisController = new ListUsuariosEmpresariaisController();
const listUsuariosController = new ListUsuariosController();
const atualizaTabelaCidadesController = new AtualizaTabelaCidadesController();
const listCidadesController = new ListCidadesController();
const createTelefoneController = new CreateTelefoneController();
const createTelefoneEmpresarialController = new CreateTelefoneEmpresarialController();
const deleteUsuarioEmpresarialController = new DeleteUsuarioEmpresarialController();
const updateUsuarioEmpresarialController = new UpdateUsuarioEmpresarialController();
const listTelefonesEmpresariaisController = new ListTelefonesEmpresariaisController();
const listTelefonesController = new ListTelefonesController();
const listCursosController = new ListCursosController();
const listGraduacaoController = new ListGraduacaoController();
const listExperienciasController = new ListExperienciasController();
const deleteTelefoneController = new DeleteTelefoneController();
const deleteCursoController = new DeleteCursoController();
const deleteExperienciaController = new DeleteExperienciaController();
const deleteGraduacaoController = new DeleteGraduacaoController();
const updateTelefoneController = new UpdateTelefoneController();
const updateCursoController = new UpdateCursoController();
const updateExperienciaController = new UpdateExperienciaController();
const updateGraduacaoController = new UpdateGraduacaoController();
const listTestesEmpresariaisController = new ListTestesEmpresariaisController();
const listTestesAtribuidosController = new ListTestesAtribuidosController();
const createTesteController = new CreateTesteController();
const listQuestoesController = new ListQuestoesController();
const deleteTesteController = new DeleteTesteController();
const listVagasEmpresariaisController = new ListVagasEmpresariaisController();
const listVagasController = new ListVagasController();
const createVagaController = new CreateVagaController();
const updateVagaController = new UpdateVagaController();
const deleteVagaController = new DeleteVagaController();
const deleteVagaTesteController = new DeleteVagaTesteController();
const listVagasTestesController = new ListVagasTestesController();
const createVagaTesteController = new CreateVagaTesteController();
const createCandidatoController = new CreateCandidatoController();
const createTesteAtribuidoController = new CreateTesteAtribuidoController();
const listCandidatosController = new ListCandidatosController();

//// POST ////
routes.post('/cidades', createCidadeController.handle);
routes.post('/cidades/atualiza', atualizaTabelaCidadesController.handle);

// CANDIDATO
routes.post('/login', authenticateUsuarioController.handle);
routes.post('/usuarios', createUsuarioController.handle);
routes.post('/telefones', ensureAuthenticatedUsuarios, createTelefoneController.handle);
routes.post('/curriculos', ensureAuthenticatedUsuarios, createCurriculoController.handle);
routes.post('/cursos', ensureAuthenticatedUsuarios, createCursoController.handle);
routes.post('/graduacao', ensureAuthenticatedUsuarios, createGraduacaoController.handle);
routes.post('/experiencias', ensureAuthenticatedUsuarios, createExperienciaController.handle);
routes.post('/candidatos', ensureAuthenticatedUsuarios, createCandidatoController.handle);

// EMPRESARIAL
routes.post('/empresas', createEmpresaController.handle);
routes.post('/empresariais/login', authenticateUsuarioEmpresarialController.handle);
routes.post('/empresariais/usuarios', ensureAuthenticatedEmpresariais, ensureAuthenticatedEmpresariaisNivel, createUsuarioEmpresarialController.handle);
routes.post('/empresariais/telefones', ensureAuthenticatedEmpresariais, createTelefoneEmpresarialController.handle);
routes.post('/empresariais/testes', ensureAuthenticatedEmpresariais, createTesteController.handle);
routes.post('/empresariais/vagas', ensureAuthenticatedEmpresariais, createVagaController.handle);
routes.post('/empresariais/vagas_testes', ensureAuthenticatedEmpresariais, createVagaTesteController.handle);
routes.post('/empresariais/testes_atribuidos', ensureAuthenticatedEmpresariais, createTesteAtribuidoController.handle);


//// GET ////
routes.get('/cidades/:uf', listCidadesController.handle);
routes.get('/cidades', listCidadesController.handle);

// CANDIDATO
// routes.get('/telefones/:id', ensureAuthenticatedUsuarios, listTelefonesController.handle);
routes.get('/usuarios', ensureAuthenticatedUsuarios, listUsuariosController.handle);
routes.get('/telefones', ensureAuthenticatedUsuarios, listTelefonesController.handle);
routes.get('/cursos/:curriculos_id', ensureAuthenticatedUsuarios, listCursosController.handle);
routes.get('/graduacao/:curriculos_id', ensureAuthenticatedUsuarios, listGraduacaoController.handle);
routes.get('/experiencias/:curriculos_id', ensureAuthenticatedUsuarios, listExperienciasController.handle);
routes.get('/vagas_testes/:vagas_id', ensureAuthenticatedUsuarios, listVagasTestesController.handle);
routes.get('/vagas', ensureAuthenticatedUsuarios, listVagasController.handle);
routes.get('/questoes', ensureAuthenticatedUsuarios, listQuestoesController.handle);
routes.get('/testes_atribuidos', ensureAuthenticatedUsuarios, listTestesAtribuidosController.handle);

// EMPRESARIAL
routes.get('/empresariais/usuarios/:id', ensureAuthenticatedEmpresariais, ensureAuthenticatedEmpresariaisNivel, listUsuariosEmpresariaisController.handle);
routes.get('/empresariais/usuarios', ensureAuthenticatedEmpresariais, listUsuariosEmpresariaisController.handle);
routes.get('/empresariais/telefones/:id', ensureAuthenticatedEmpresariais, listTelefonesEmpresariaisController.handle);
routes.get('/empresariais/testes', ensureAuthenticatedEmpresariais, listTestesEmpresariaisController.handle);
routes.get('/empresariais/questoes', ensureAuthenticatedEmpresariais, listQuestoesController.handle);
routes.get('/empresariais/vagas', ensureAuthenticatedEmpresariais, listVagasEmpresariaisController.handle);
routes.get('/empresariais/vagas_testes/:vagas_id', ensureAuthenticatedEmpresariais, listVagasTestesController.handle);
routes.get('/empresariais/candidatos', ensureAuthenticatedUsuarios, listCandidatosController.handle);


//// DELETE ////

// CANDIDATO
routes.delete('/telefones/:id', ensureAuthenticatedUsuarios, deleteTelefoneController.handle);
routes.delete('/cursos/:id', ensureAuthenticatedUsuarios, deleteCursoController.handle);
routes.delete('/experiencia/:id', ensureAuthenticatedUsuarios, deleteExperienciaController.handle);
routes.delete('/graduacao/:id', ensureAuthenticatedUsuarios, deleteGraduacaoController.handle);

// EMPRESARIAL
routes.delete('/empresariais/usuarios/:id', ensureAuthenticatedEmpresariais, ensureAuthenticatedEmpresariaisNivel, deleteUsuarioEmpresarialController.handle);
routes.delete('/empresariais/telefones/:id', ensureAuthenticatedEmpresariais, deleteTelefoneController.handle);
routes.delete('/empresariais/testes/:id/:versao', ensureAuthenticatedEmpresariais, deleteTesteController.handle);
routes.delete('/empresariais/vagas/:id', ensureAuthenticatedEmpresariais, deleteVagaController.handle);
routes.delete('/empresariais/vagas_testes/:vagas_id/:testes_id/:testes_versao', ensureAuthenticatedEmpresariais, deleteVagaTesteController.handle);

//// UPDATE ////

// CANDIDATO
routes.put('/telefones', ensureAuthenticatedUsuarios, updateTelefoneController.handle);
routes.put('/cursos', ensureAuthenticatedUsuarios, updateCursoController.handle);
routes.put('/experiencias', ensureAuthenticatedUsuarios, updateExperienciaController.handle);
routes.put('/graduacao', ensureAuthenticatedUsuarios, updateGraduacaoController.handle);

// EMPRESARIAL
routes.put('/empresariais/usuarios', ensureAuthenticatedEmpresariais, ensureAuthenticatedEmpresariaisNivel, updateUsuarioEmpresarialController.handle);
routes.put('/empresariais/telefones', ensureAuthenticatedEmpresariais, updateTelefoneController.handle);
routes.put('/empresariais/vagas', ensureAuthenticatedEmpresariais, updateVagaController.handle);

export default routes;
