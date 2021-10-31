import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import Experiencia from "../entities/Experiencia";
import ExperienciasRepository from "../repositories/ExperienciasRepository";

interface IExperienciaRequest {
    id:string;
    empresa: string;
    cargo: string;
    descricao: string;
		data_inicio: Date;
		data_termino: Date;
		curriculos_id?: string;
}

class UpdateExperienciaService {
  async execute({
		id,
		empresa,
		cargo,
		descricao,
		data_inicio,
		data_termino,
		curriculos_id
  }: IExperienciaRequest) {
    const experienciasRepository = getCustomRepository(ExperienciasRepository);


    const currentExperiencia = await experienciasRepository.findOne({
      id
    });

    const newExperienciaData: Experiencia = {
      ...currentExperiencia,
			id,
			empresa,
			cargo,
			descricao,
			data_inicio,
			data_termino,
			curriculos_id
    }

    await experienciasRepository
      .update({ id }, newExperienciaData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newExperienciaData;
  }
}

export default UpdateExperienciaService;
