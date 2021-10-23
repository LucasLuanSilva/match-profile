import { getConnection, getCustomRepository } from "typeorm";

import CustomError from "../class/CustomError";
import CidadesRepository from "../repositories/CidadesRepository";
import EmpresasRepository from "../repositories/EmpresasRepository";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";
import { hash } from "bcryptjs";
import TelefoneRepository from "../repositories/TelefonesRepository";

interface ITelefoneRequest {
  ddd: string;
  numero: string;
  tipo: number;
  contato: string;
}

interface IUsuarioEmpresarialRequest {
  empresas_id: string;
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
  nivel: Number;
  telefones?: Array<ITelefoneRequest>
}

class CreateUsuarioEmpresarialService {
  async execute({
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
    situacao,
    nivel,
    telefones
  }: IUsuarioEmpresarialRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const cidadesRepository = getCustomRepository(CidadesRepository);

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

    const empresaExiste = await empresasRepository.findOne(empresas_id);

    if (!empresaExiste) {
      throw new CustomError(400, 'Empresa informada não encontrada!');
    }

    const cidadeExiste = await cidadesRepository.findOne(cidades_codigo_municipio);

    if (!cidadeExiste) {
      throw new CustomError(400, 'Cidade informada não encontrada!');
    }

    const senhaHash = await hash(senha, 8);

    const usuarioEmpresarial = usuariosEmpresariaisRepository.create({
      empresas_id,
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
      situacao,
      nivel
    });

    const telefonesRepository = getCustomRepository(TelefoneRepository);

    for (var i in telefones) {
      if (!telefones[i].ddd || telefones[i].ddd.length != 2) {
        throw new CustomError(400, "Informe um DDD valido.");
      }

      if (!telefones[i].numero || telefones[i].numero.length != 8) {
        throw new CustomError(400, "Infome um número valido.");
      }

      if ([0, 1, 2].indexOf(telefones[i].tipo) == -1) {
        throw new CustomError(400, "Informe um tipo valido.");
      }
    }

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(usuarioEmpresarial);

      telefones?.map(async ({ ddd, numero, tipo, contato }) => {
        const telefone = telefonesRepository.create({
          ddd,
          numero,
          tipo,
          contato,
          usuarios_empresariais_id: usuarioEmpresarial.id,
          usuarios_empresariais_empresas_id: empresas_id
        });

        await transactionalEntityManager.save(telefone);
      })
    });

    return usuarioEmpresarial;
  }
}

export default CreateUsuarioEmpresarialService;
