import { getCustomRepository } from "typeorm";

import CustomError from "../class/CustomError";
import EmpresasRepository from "../repositories/EmpresasRepository";
import TelefonesRepository from "../repositories/TelefonesRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";
import UsuariosRepository from "../repositories/UsuariosRepository";

interface ITelefoneRequest {
  ddd: string;
  numero: string;
  tipo: number | string;
  contato: string;
  usuarios_id?: string;
  usuarios_empresariais_id?: string;
  usuarios_empresariais_empresas_id?: string;
}

class CreateTelefoneService {
  async execute({
    ddd,
    numero,
    tipo,
    contato,
    usuarios_id,
    usuarios_empresariais_id,
    usuarios_empresariais_empresas_id
  }: ITelefoneRequest) {
    const telefonesRepository = getCustomRepository(TelefonesRepository);
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    if (!ddd || ddd.replace(/[^\d]+/g, '').length != 2) {
      throw new CustomError(400, "Informe um DDD valido.");
    }
    ddd = ddd.replace(/[^\d]+/g, '');

    if (!numero || (numero.replace(/[^\d]+/g, '').length != 8 && numero.replace(/[^\d]+/g, '').length != 9)) {
      throw new CustomError(400, "Infome um número valido.");
    }
    numero = numero.replace(/[^\d]+/g, '');

    if ([0, 1, 2].indexOf(Number(tipo)) == -1) {
      throw new CustomError(400, "Informe um tipo valido.");
    }
    tipo = Number(tipo);

    if (usuarios_empresariais_id) {
      usuarios_id = undefined;

      const usuarioExiste = await usuariosEmpresariaisRepository.findOne(usuarios_empresariais_id);

      if (!usuarioExiste) {
        throw new CustomError(400, 'Usuário informado não encontrado!');
      }

      const empresaExiste = await empresasRepository.findOne(usuarios_empresariais_empresas_id);

      if (!empresaExiste) {
        throw new CustomError(400, 'Empresa informada não encontrada!');
      }
    } else {
      usuarios_empresariais_id = undefined;
      usuarios_empresariais_empresas_id = undefined;

      const usuarioExiste = await usuariosRepository.findOne(usuarios_id);

      if (!usuarioExiste) {
        throw new CustomError(400, 'Usuário informado não encontrado!');
      }
    }

    const telefone = telefonesRepository.create({
      ddd,
      numero,
      tipo,
      contato,
      usuarios_id,
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    });

    await telefonesRepository.save(telefone);

    return telefone;
  }
}

export default CreateTelefoneService;
