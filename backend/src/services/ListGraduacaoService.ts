import { getCustomRepository } from "typeorm"
import GraduacaoRepository from "../repositories/GraduacaoRepository";

class ListGraduacaoService {
  async execute(curriculos_id?: string) {
  
    const graduacaoRepository = getCustomRepository(GraduacaoRepository);
    
    const graduacao = await graduacaoRepository.find({curriculos_id});

    return graduacao;
  }
}

export default ListGraduacaoService;
