import { getCustomRepository } from "typeorm";
import TestesRepository from "../repositories/TestesRepository";
import VagasTestesRepository from "../repositories/VagasTestesRepository";

class ListVagasTestesService {
  async execute(vagas_id: string) {
    const vagasTestesRepository = getCustomRepository(VagasTestesRepository);
    const testesRepository = getCustomRepository(TestesRepository);

    const vagasTestes = await vagasTestesRepository.find({ vagas_id });

    let testes = [];
    for (var i in vagasTestes) {
      const teste = await testesRepository.findOne({
        id: vagasTestes[i].testes_id,
        versao: vagasTestes[i].testes_versao
      });

      testes.push(teste);
    }

    return testes;
  }
}

export default ListVagasTestesService;
