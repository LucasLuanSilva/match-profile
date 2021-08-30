import { getCustomRepository } from "typeorm";

import CustomError from "../class/CustomError";
import CidadesRepository from "../repositories/CidadesRepository";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { hash } from "bcryptjs";

interface IUsuarioRequest {
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  rg?: string;
  senha: string;
  estado_civil?: Number;
  cep: string;
  cidades_codigo_municipio: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  situacao: Number;
}

class CreateUsuarioService {
  async execute({
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
    situacao
  }: IUsuarioRequest) {
    const usuariosRepository = getCustomRepository(UsuariosRepository);
    const cidadesRepository = getCustomRepository(CidadesRepository);

    const cpfExiste = await usuariosRepository.findOne({
      cpf
    });

    if (cpfExiste) {
      throw new CustomError(400, 'Já existe um usuário com este CPF!');
    }

    const emailExiste = await usuariosRepository.findOne({
      email
    });

    if (emailExiste) {
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

    const usuario = usuariosRepository.create({
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
      situacao
    });

    await usuariosRepository.save(usuario);

    return usuario;
  }
}

export default CreateUsuarioService;
