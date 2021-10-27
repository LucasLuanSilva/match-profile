import { getCustomRepository, Not } from "typeorm";

import CustomError from "../class/CustomError";
import CidadesRepository from "../repositories/CidadesRepository";
import EmpresasRepository from "../repositories/EmpresasRepository";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";
import { hash } from "bcryptjs";
import UsuarioEmpresarial from "../entities/UsuarioEmpresarial";
import { classToPlain } from "class-transformer";

interface IUsuarioEmpresarialRequest {
  id: string,
  empresas_id: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  rg?: string;
  senha: string;
  estado_civil?: number;
  cep: string;
  cidades_codigo_municipio: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  situacao: number;
  nivel: number;
}

class UpdateUsuarioEmpresarialService {
  async execute({
    id,
    empresas_id,
    cpf,
    nome,
    sobrenome,
    email,
    rg,
    senha,
    estado_civil,
    cep,
    cidades_codigo_municipio,
    logradouro,
    numero,
    complemento,
    bairro,
    situacao = 1,
    nivel = 0
  }: IUsuarioEmpresarialRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const cidadesRepository = getCustomRepository(CidadesRepository);

    if (!nome) {
      throw new CustomError(400, 'Informe um nome valido!');
    }

    if (!sobrenome) {
      throw new CustomError(400, 'Informe um sobrenome valido!');
    }

    if (!email) {
      throw new CustomError(400, 'Informe um email valido!');
    }

    if (!rg) {
      throw new CustomError(400, 'Informe um rg valido!');
    }

    if (!senha || senha.length < 6) {
      throw new CustomError(400, 'Informe uma senha com no mínimo 6 digitos!');
    }

    if (!cep || cep.length != 8) {
      throw new CustomError(400, 'Informe um cep valido!');
    }

    if (!numero) {
      throw new CustomError(400, 'Informe um número valido!');
    }

    if (!bairro) {
      throw new CustomError(400, 'Informe um bairro!');
    }

    if (!estado_civil || [0, 1, 2, 3, 4].indexOf(Number(estado_civil)) == -1) {
      throw new CustomError(400, 'Informe um estado civil!');
    }

    const cpfExiste = await usuariosEmpresariaisRepository.findOne({
      cpf
    });

    if (cpfExiste && cpfExiste.id != id) {
      throw new CustomError(400, 'Já existe um usuário com este CPF!');
    }

    const emailExiste = await usuariosEmpresariaisRepository.findOne({
      email
    });

    if (emailExiste && emailExiste.id != id) {
      throw new CustomError(400, 'Já existe um usuário com este email!');
    }

    if (!cpfValidator.isValid(cpf)) {
      throw new CustomError(400, 'Informe um CPF válido!');
    }

    const empresaExiste = await empresasRepository.findOne(empresas_id);

    if (!empresaExiste) {
      throw new CustomError(400, 'Empresa informada não encontrada!');
    }

    const cidadeExiste = await cidadesRepository.findOne(cidades_codigo_municipio);

    if (!cidadeExiste) {
      throw new CustomError(400, 'Cidade informada não encontrada!');
    }

    const senhaHash = await hash(senha, 8);

    const currentUser = await usuariosEmpresariaisRepository.findOne({
      id,
      empresas_id
    });

    const data_alteracao = new Date();

    const newUserData: UsuarioEmpresarial = {
      ...currentUser,
      cpf,
      nome,
      sobrenome,
      email,
      rg,
      senha: senhaHash,
      estado_civil,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      data_alteracao,
      situacao,
      nivel
    }
    console.log(id)
    await usuariosEmpresariaisRepository
      .update({ id, empresas_id }, newUserData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newUserData;
  }
}

export default UpdateUsuarioEmpresarialService;
