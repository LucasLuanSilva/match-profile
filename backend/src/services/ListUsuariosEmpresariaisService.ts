import { classToPlain } from "class-transformer";
import { getCustomRepository, Not } from "typeorm";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

class ListUsuariosEmpresariaisService {
  async execute(id: string, idBusca?: string) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);

    let usuario = {};

    if (idBusca) {
      usuario = await usuariosEmpresariaisRepository.find({
        where: {
          id: idBusca
        },
        relations: ['cidade']
      });
    } else {
      usuario = await usuariosEmpresariaisRepository.find({ id: Not(id) })
    }

    return classToPlain(usuario);
  }
}

export default ListUsuariosEmpresariaisService
