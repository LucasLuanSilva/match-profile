import { getConnection, getCustomRepository } from "typeorm";

import CustomError from "../class/CustomError";
import CidadesRepository from "../repositories/CidadesRepository";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import UsuariosRepository from "../repositories/UsuariosRepository";
import { hash } from "bcryptjs";
import TelefoneRepository from "../repositories/TelefonesRepository";

interface ITelefoneRequest {
  ddd: string;
  numero: string;
  tipo: number;
  contato: string;
}

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
  telefones?: Array<ITelefoneRequest>
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
    situacao,
    telefones
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
      await transactionalEntityManager.save(usuario);

      telefones?.map(async ({ ddd, numero, tipo, contato }) => {
        const telefone = telefonesRepository.create({
          ddd,
          numero,
          tipo,
          contato,
          usuarios_id: usuario.id
        });

        await transactionalEntityManager.save(telefone);
      })
    });

    return usuario;
  }
}

export default CreateUsuarioService;
