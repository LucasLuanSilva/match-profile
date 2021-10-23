import { getCustomRepository } from "typeorm";

import CustomError from "../class/CustomError";
import EmpresasRepository from "../repositories/EmpresasRepository";
import TelefoneRepository from "../repositories/TelefonesRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";
import UsuariosRepository from "../repositories/UsuariosRepository";

interface ITelefoneRequest {
  ddd: string;
  numero: string;
  tipo: number;
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
    const telefonesRepository = getCustomRepository(TelefoneRepository);
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    if (!ddd || ddd.length != 2) {
      throw new CustomError(400, "Informe um DDD valido.");
    }

    if (!numero || numero.length != 8) {
      throw new CustomError(400, "Infome um número valido.");
    }

    if ([0, 1, 2].indexOf(tipo) == -1) {
      throw new CustomError(400, "Informe um tipo valido.");
    }

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
