import { getCustomRepository } from "typeorm"
import CidadesRepository from "../repositories/CidadesRepository";

class ListCidadesService {
  async execute(uf?: string) {
    const cidadesRepository = getCustomRepository(CidadesRepository);

    const cidades = await cidadesRepository.find(uf ? {
      uf
    } : undefined);

    return cidades;
  }
}

export default ListCidadesService;
