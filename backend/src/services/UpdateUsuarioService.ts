import { getCustomRepository, Not } from "typeorm";

import CustomError from "../class/CustomError";
import CidadesRepository from "../repositories/CidadesRepository";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { hash } from "bcryptjs";
import UsuariosRepository from "../repositories/UsuariosRepository";

interface IUsuarioRequest {
  id: string,
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
  twitter: string;
  situacao: number;
}

class UpdateUsuarioService {
  async execute({
    id,
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
    twitter,
    situacao = 1
  }: IUsuarioRequest) {
    const usuariosRepository = getCustomRepository(UsuariosRepository);
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

    const cpfExiste = await usuariosRepository.findOne({
      cpf
    });

    if (cpfExiste && cpfExiste.id != id) {
      throw new CustomError(400, 'Já existe um usuário com este CPF!');
    }

    const emailExiste = await usuariosRepository.findOne({
      email
    });

    if (emailExiste && emailExiste.id != id) {
      throw new CustomError(400, 'Já existe um usuário com este email!');
    }

    if (!cpfValidator.isValid(cpf)) {
      throw new CustomError(400, 'Informe um CPF válido!');
    }

    const cidadeExiste = await cidadesRepository.findOne(cidades_codigo_municipio);

    if (!cidadeExiste) {
      throw new CustomError(400, 'Cidade informada não encontrada!');
    }

    const senhaHash = await hash(senha, 8);

    const currentUser = await usuariosRepository.findOne({
      id
    });

    const data_alteracao = new Date();

    const newUserData = {
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
      twitter,
      data_alteracao,
      situacao
    }

    await usuariosRepository
      .update({ id }, newUserData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newUserData;
  }
}

export default UpdateUsuarioService;
