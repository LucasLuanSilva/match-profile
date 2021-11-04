import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import Competencia from "../entities/Competencia";
import CompetenciaRepository from "../repositories/CompetenciasRepository";

interface ICompetenciaRequest {
    id:string;
    nivel:Number;
    descricao:string;
    curriculos_id?: string;
}

class UpdateCompetenciaService {
  async execute({
    id,
    nivel,
    descricao,
    curriculos_id
  }: ICompetenciaRequest) {
    const competenciaRepository = getCustomRepository(CompetenciaRepository);


    const currentCompetencia = await competenciaRepository.findOne({
      id
    });

    const newCompetenciaData: Competencia = {
      ...currentCompetencia,
      id,
      nivel,
      descricao,
      curriculos_id
    }

    await competenciaRepository
      .update({ id }, newCompetenciaData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newCompetenciaData;
  }
}

export default UpdateCompetenciaService;
