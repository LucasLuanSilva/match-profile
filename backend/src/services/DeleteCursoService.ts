import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CursosRepository from "../repositories/CursosRepository";

class DeleteCursoService {
  async execute(
    id: string
  ) {
    const cursosRepository = getCustomRepository(CursosRepository);

    const curso = await cursosRepository.findOne({ id });

    if (!curso) {
      throw new CustomError(400, 'Curso não encontrado!');
    }

    await cursosRepository.delete({
      id
    });

    return curso;
  }
}

export default DeleteCursoService;
