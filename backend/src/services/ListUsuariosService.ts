import { classToPlain } from "class-transformer";
import { getCustomRepository, Not } from "typeorm";
import UsuariosRepository from "../repositories/UsuariosRepository";

class ListUsuariosService {
  async execute(id?: string) {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuariosRepository.findOne({ where: {
      id
    },
    relations: ['cidade'] })

    return usuario;
  }
}

export default ListUsuariosService
