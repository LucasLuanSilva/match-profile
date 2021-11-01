import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import Graduacao from "../entities/Graduacao";
import GraduacaoRepository from "../repositories/GraduacaoRepository";

interface IGraduacaoRequest {
    id:string;
    nivel:Number;
		nome:string;
		descricao:string;
		instituicao:string;
		ano_inicio: string;
		ano_termino: string;
		cursando: Number;
		curriculos_id?: string;
}

class UpdateGraduacaoService {
  async execute({
    id,
    nivel,
    nome,
    descricao,
    instituicao,
    ano_inicio,
    ano_termino,
    cursando,
    curriculos_id
  }: IGraduacaoRequest) {
    const graduacaoRepository = getCustomRepository(GraduacaoRepository);


    const currentGraduacao = await graduacaoRepository.findOne({
      id
    });

    const newGraduacaoData: Graduacao = {
      ...currentGraduacao,
      id,
      nivel,
      nome,
      descricao,
      instituicao,
      ano_inicio,
      ano_termino,
      cursando,
      curriculos_id
    }

    await graduacaoRepository
      .update({ id }, newGraduacaoData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newGraduacaoData;
  }
}

export default UpdateGraduacaoService;
