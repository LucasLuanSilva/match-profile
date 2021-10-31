import { getCustomRepository } from "typeorm";
import QuestoesRepository from "../repositories/QuestoesRepository";
import RespostasRepository from "../repositories/RespostasRepository";

interface IRequestQuestao {
  testes_id: string,
  testes_versao: string | number
}

class ListQuestoesService {
  async execute({
    testes_id,
    testes_versao
  }: IRequestQuestao) {
    console.log(testes_id);
    console.log(testes_versao)
    const questoesRepository = getCustomRepository(QuestoesRepository);
    const respostasRepository = getCustomRepository(RespostasRepository);

    let questoes = await questoesRepository.find({
      testes_id,
      testes_versao: Number(testes_versao)
    });

    for (var i in questoes) {
      questoes[i].respostas = await respostasRepository.find({
        questoes_id: questoes[i].id
      });
    }

    return questoes;
  }
}

export default ListQuestoesService;
