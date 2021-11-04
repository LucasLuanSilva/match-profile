import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CompetenciasRepository from "../repositories/CompetenciasRepository";

class DeleteCompetenciaService {
  async execute(
    id: string
  ) {
    const competenciasRepository = getCustomRepository(CompetenciasRepository);

    const competencia = await competenciasRepository.findOne({ id });

    if (!competencia) {
      throw new CustomError(400, 'Competência não encontrada!');
    }

    await competenciasRepository.delete({
      id
    });

    return competencia;
  }
}

export default DeleteCompetenciaService;
