import { getCustomRepository } from "typeorm"
import CursosRepository from "../repositories/CursosRepository";

class ListCursosService {
  async execute(curriculos_id?: string) {
  
    const cursosRepository = getCustomRepository(CursosRepository);
    
    const cursos = await cursosRepository.find({curriculos_id});

    return cursos;
  }
}

export default ListCursosService;
