import { getCustomRepository } from "typeorm"
import CompetenciasRepository from "../repositories/CompetenciasRepository";

class ListCompetenciasService {
  async execute(curriculos_id?: string) {
  
    const competenciaRepository = getCustomRepository(CompetenciasRepository);
    
    const competencia = await competenciaRepository.find({curriculos_id});

    return competencia;
  }
}

export default ListCompetenciasService;
