import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

class ListUsuariosEmpresariaisService {
  async execute(id?: string) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);

    const usuario = await usuariosEmpresariaisRepository.find(id ? {
      id
    } : undefined);

    return classToPlain(usuario);
  }
}

export default ListUsuariosEmpresariaisService
