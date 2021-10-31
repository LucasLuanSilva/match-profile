import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import ExperienciasRepository from "../repositories/ExperienciasRepository";

class DeleteExperienciaService {
  async execute(
    id: string
  ) {
    const experienciasRepository = getCustomRepository(ExperienciasRepository);

    const experiencia = await experienciasRepository.findOne({ id });

    if (!experiencia) {
      throw new CustomError(400, 'Experiencia não encontrado!');
    }

    await experienciasRepository.delete({
      id
    });

    return experiencia;
  }
}

export default DeleteExperienciaService;
