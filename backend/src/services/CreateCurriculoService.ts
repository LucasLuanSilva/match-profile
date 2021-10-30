import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CurriculosRepository from "../repositories/CurriculosRepository";


interface ICurriculoRequest {
  arquivo: string;
  usuarios_id?: string;
}

class CreateCurriculoService {
  async execute({
    arquivo,
    usuarios_id,
  }: ICurriculoRequest) {
    const curriculosRepository = getCustomRepository(CurriculosRepository)
    
		const curriculoExiste = await curriculosRepository.findOne({usuarios_id});
    
    if (!curriculoExiste) {
			const curriculo = curriculosRepository.create({
				arquivo,
				usuarios_id
			});
	
			curriculosRepository.save(curriculo);
	
			return curriculo;
    }

		return curriculoExiste;

  }
}

export default CreateCurriculoService;
