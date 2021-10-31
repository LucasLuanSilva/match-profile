import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import ExperienciasRepository from "../repositories/ExperienciasRepository";

interface IExperienciaRequest {
	empresa:string;
	cargo:string;
	descricao:string;
  data_inicio: Date;
  data_termino: Date;
  curriculos_id?: string;
}

class CreateExperienciaService {
  async execute({
    empresa,
    cargo,
    descricao,
    data_inicio,
    data_termino,
    curriculos_id
  }: IExperienciaRequest) {
    const experienciasRepository = getCustomRepository(ExperienciasRepository)
    
    const experiencia = await experienciasRepository.create({
        empresa,
        cargo,
        descricao,
        data_inicio:new Date(data_inicio),
        data_termino:new Date(data_termino),
        curriculos_id
    });

    await experienciasRepository.save(experiencia);

    return experiencia;
  }
}

export default CreateExperienciaService;
