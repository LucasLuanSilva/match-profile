import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import GraduacaoRepository from "../repositories/GraduacaoRepository";

class DeleteGraduacaoService {
  async execute(
    id: string
  ) {
    const graduacaoRepository = getCustomRepository(GraduacaoRepository);

    const graduacao = await graduacaoRepository.findOne({ id });

    if (!graduacao) {
      throw new CustomError(400, 'Graduacao não encontrado!');
    }

    await graduacaoRepository.delete({
      id
    });

    return graduacao;
  }
}

export default DeleteGraduacaoService;
