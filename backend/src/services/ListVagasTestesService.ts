import { getCustomRepository } from "typeorm";
import VagasTestesRepository from "../repositories/VagasTestesRepository";

class ListVagasTestesService {
  async execute(vagas_id?: string) {

    const vagasTestesRepository = getCustomRepository(VagasTestesRepository);

    const vagasTestes = await vagasTestesRepository.find({ vagas_id });

    return vagasTestes;
  }
}

export default ListVagasTestesService;
