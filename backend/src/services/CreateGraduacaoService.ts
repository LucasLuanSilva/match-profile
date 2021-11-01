import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import GraduacaoRepository from "../repositories/GraduacaoRepository";

interface IGraduacaoRequest {
	nivel:Number;
	nome:string;
	descricao:string;
  instituicao:string;
  ano_inicio: string;
  ano_termino: string;
  cursando: Number;
  curriculos_id?: string;
}

class CreateGraduacaoService {
  async execute({
    nivel,
    nome,
    descricao,
    instituicao,
    ano_inicio,
    ano_termino,
    cursando,
    curriculos_id
  }: IGraduacaoRequest) {
    
    const graduacaoRepository = getCustomRepository(GraduacaoRepository)

    const graduacao = await graduacaoRepository.create({
      nivel,
      nome,
      descricao,
      instituicao,
      ano_inicio,
      ano_termino,
      cursando,
      curriculos_id
    });
    console.log(graduacao);
    await graduacaoRepository.save(graduacao);

    return graduacao;
  }
}

export default CreateGraduacaoService;
