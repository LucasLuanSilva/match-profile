import { getCustomRepository } from "typeorm";
import QuestoesRepository from "../repositories/QuestoesRepository";
import RespostasPreenchidasRepository from "../repositories/RespostasPreenchidasRepository";
import RespostasRepository from "../repositories/RespostasRepository";

interface IRequestRespostas {
  testes_atribuidos_id: string,
  testes_id: string,
  testes_versao: string | number
}

class GetRespostasPreenchidasService {
  async execute({
    testes_atribuidos_id,
    testes_id,
    testes_versao
  }: IRequestRespostas) {
    const questoesRepository = getCustomRepository(QuestoesRepository);
    const respostasRepository = getCustomRepository(RespostasRepository);
    const respostasPreenchidasRepository = getCustomRepository(RespostasPreenchidasRepository);

    let questoes = await questoesRepository.find({
      testes_id,
      testes_versao: Number(testes_versao)
    });

    for (var i in questoes) {
      questoes[i].respostas = await respostasRepository.find({
        questoes_id: questoes[i].id
      });

      for (var j in questoes[i].respostas) {
        questoes[i].respostas[j].respostas_preenchidas = await respostasPreenchidasRepository.findOne({
          questoes_id: questoes[i].id,
          respostas_id: questoes[i].respostas[j].id,
          testes_atribuidos_id
        });
      }
    }

    return questoes;
  }
}

export default GetRespostasPreenchidasService;
