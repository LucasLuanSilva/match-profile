import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import VagasTestesRepository from "../repositories/VagasTestesRepository";

interface IVagaTesteRequest {
  vagas_id: string,
  testes_id: string,
  testes_versao: string | number
}

class DeleteVagaTesteService {
  async execute({
    vagas_id,
    testes_id,
    testes_versao
  }: IVagaTesteRequest) {
    const vagasTestesRepository = getCustomRepository(VagasTestesRepository);

    const vagaTeste = await vagasTestesRepository.findOne({
      vagas_id,
      testes_id,
      testes_versao: Number(testes_versao)
    });

    if (!vagaTeste) {
      throw new CustomError(400, 'Teste não encontrado!');
    }

    await vagasTestesRepository.delete({
      vagas_id,
      testes_id,
      testes_versao: Number(testes_versao)
    });

    return vagaTeste;
  }
}

export default DeleteVagaTesteService;
