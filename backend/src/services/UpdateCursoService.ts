import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import Curso from "../entities/Curso";
import CursosRepository from "../repositories/CursosRepository";

interface ICursoRequest {
  id: string;
  nome: string;
  instituicao: string;
  data_inicio: Date;
	data_termino: Date;
  curriculos_id?: string;
}

class UpdateCursoService {
  async execute({
		id,
    nome,
    instituicao,
    data_inicio,
    data_termino,
    curriculos_id
  }: ICursoRequest) {
    const cursosRepository = getCustomRepository(CursosRepository);


    const currentCurso = await cursosRepository.findOne({
      id
    });

    const newCursoData: Curso = {
      ...currentCurso,
			id,
      nome,
			instituicao,
			data_inicio,
			data_termino,
			curriculos_id
    }

    await cursosRepository
      .update({ id }, newCursoData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newCursoData;
  }
}

export default UpdateCursoService;
