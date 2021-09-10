import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import { cnpj as cnpjValidator, cpf as cpfValidator } from "cpf-cnpj-validator";
import { hash } from "bcryptjs";
import dayjs from "dayjs";

import CidadesRepository from "../repositories/CidadesRepository";
import EmpresasRepository from "../repositories/EmpresasRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";


interface IEmpresaRequest {
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  cep: string;
  cidades_codigo_municipio: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  site?: string;
  situacao: Number;
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

class CreateEmpresaService {
  async execute({
    cnpj,
    razao_social,
    nome_fantasia,
    cep,
    cidades_codigo_municipio,
    logradouro,
    numero,
    complemento,
    bairro,
    site,
    situacao,
    cpf,
    nome,
    sobrenome,
    email,
    senha
  }: IEmpresaRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const cidadesRepository = getCustomRepository(CidadesRepository);

    const empresaExiste = await empresasRepository.findOne({
      cnpj
    });

    if (empresaExiste) {
      throw new CustomError(400, 'A empresa já possui cadastro, para mais informações entre em contato!');
    }

    const cidadeExiste = await cidadesRepository.findOne(cidades_codigo_municipio);

    if (!cidadeExiste) {
      throw new CustomError(400, 'Cidade informada não encontrada!');
    }

    if (!cnpjValidator.isValid(cnpj)) {
      throw new CustomError(400, 'O CNPJ informado é inválido!');
    }

    const cpfExiste = await usuariosEmpresariaisRepository.findOne({
      cpf
    });

    if (cpfExiste) {
      throw new CustomError(400, 'Já existe um usuário com este CPF!');
    }

    const emailExiste = await usuariosEmpresariaisRepository.findOne({
      email
    });

    if (emailExiste) {
      throw new CustomError(400, 'Já existe um usuário com este email!');
    }

    if (!cpfValidator.isValid(cpf)) {
      throw new CustomError(400, 'Informe um CPF válido!');
    }

    const data_termino_contrato = new Date(dayjs().add(7, 'day').format());

    const empresa = empresasRepository.create({
      cnpj,
      razao_social,
      nome_fantasia,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      site,
      situacao,
      data_termino_contrato
    });

    const senhaHash = await hash(senha, 8);

    const usuarioEmpresarial = usuariosEmpresariaisRepository.create({
      empresas_id: empresa.id,
      cpf,
      nome,
      sobrenome,
      email,
      senha: senhaHash,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      situacao,
      nivel: 1
    });

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(empresa);
      await transactionalEntityManager.save(usuarioEmpresarial);
    });

    return empresa;
  }
}

export default CreateEmpresaService;
