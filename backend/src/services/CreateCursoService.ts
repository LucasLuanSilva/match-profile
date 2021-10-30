import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CursosRepository from "../repositories/CursosRepository";

interface ICursoRequest {
  nome: string;
  instituicao: string;
  data_inicio: Date;
  data_termino: Date;
  curriculos_id?: string;
}

class CreateCursoService {
  async execute({
    nome,
    instituicao,
    data_inicio,
    data_termino,
    curriculos_id
  }: ICursoRequest) {
    const cursosRepository = getCustomRepository(CursosRepository)
    
    const curso = cursosRepository.create({
        nome,
        instituicao,
        data_inicio,
        data_termino,
        curriculos_id
    });

    cursosRepository.save(curso);

    return curso;
  }
}

export default CreateCursoService;
