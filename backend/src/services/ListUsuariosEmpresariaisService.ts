import { classToPlain } from "class-transformer";
import { getCustomRepository, Not } from "typeorm"
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

class ListUsuariosEmpresariaisService {
  async execute(id: string, idBusca?: string) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);

    const usuario = await usuariosEmpresariaisRepository.find(idBusca ? {
      id: idBusca
    } : { id: Not(id) });

    return classToPlain(usuario);
  }
}

export default ListUsuariosEmpresariaisService
