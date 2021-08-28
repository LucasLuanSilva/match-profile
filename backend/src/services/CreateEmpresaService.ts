import { getCustomRepository } from 'typeorm';
import CustomError from '../class/CustomError';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

import CidadesRepository from "../repositories/CidadesRepository";
import EmpresasRepository from "../repositories/EmpresasRepository";
import dayjs from 'dayjs';

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
    situacao
  }: IEmpresaRequest) {
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

    const data_termino_contrato = new Date(dayjs().add(7, 'day').format('DD/MM/YYYY'));

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

    await empresasRepository.save(empresa);

    return empresa;
  }
}

export default CreateEmpresaService;
