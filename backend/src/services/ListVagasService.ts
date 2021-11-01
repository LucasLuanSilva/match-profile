import { getCustomRepository } from "typeorm";
import VagasRepository from "../repositories/VagasRepository";

interface IRequestVaga {
}

class ListVagasService {
  async execute({
    
  }: IRequestVaga) {
    const vagasRepository = getCustomRepository(VagasRepository);

    let vagas = await vagasRepository.find({
    });

    return vagas;
  }
}

export default ListVagasService;
