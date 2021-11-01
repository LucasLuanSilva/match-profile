import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import VagasTestesRepository from "../repositories/VagasTestesRepository";


interface IVagaTesteRequest {
  vagas_id: string;
  testes_id: string;
  testes_versao: string | number;
}

class CreateVagaTesteService {
  async execute({
    vagas_id,
    testes_id,
    testes_versao
  }: IVagaTesteRequest) {
    const vagasTestesRepository = getCustomRepository(VagasTestesRepository)

    const vagaTesteExiste = await vagasTestesRepository.findOne({
      vagas_id,
      testes_id,
      testes_versao: Number(testes_versao)
    });

    if (vagaTesteExiste) {
      throw new CustomError(400, 'O teste selecionado já foi adicionado!');
    }

    const vagaTeste = vagasTestesRepository.create({
      vagas_id,
      testes_id,
      testes_versao: Number(testes_versao)
    });

    vagasTestesRepository.save(vagaTeste);

    return vagaTeste;
  }
}

export default CreateVagaTesteService;
