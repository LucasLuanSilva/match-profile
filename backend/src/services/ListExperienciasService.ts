import { getCustomRepository } from "typeorm"
import ExperienciasRepository from "../repositories/ExperienciasRepository";

class ListExperienciasService {
  async execute(curriculos_id?: string) {
  
    const experienciasRepository = getCustomRepository(ExperienciasRepository);
    
    const experiencias = await experienciasRepository.find({curriculos_id});

    return experiencias;
  }
}

export default ListExperienciasService;
