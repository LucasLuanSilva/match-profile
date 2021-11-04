import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CompetenciasRepository from "../repositories/CompetenciasRepository";

interface ICompetenciaRequest {
  descricao: string;
  nivel: Number;
  curriculos_id?: string;
}

class CreateCompetenciaService {
  async execute({
    descricao,
    nivel,
    curriculos_id
  }: ICompetenciaRequest) {
    const competenciasRepository = getCustomRepository(CompetenciasRepository)
    
    const competencia = await competenciasRepository.create({
        descricao,
        nivel,
        curriculos_id
    });

    await competenciasRepository.save(competencia);

    return competencia;
  }
}

export default CreateCompetenciaService;
