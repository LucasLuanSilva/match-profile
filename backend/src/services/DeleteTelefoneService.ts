import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import TelefoneRepository from "../repositories/TelefonesRepository";

class DeleteTelefoneService {
  async execute(
    id: string
  ) {
    const telefonesRepository = getCustomRepository(TelefoneRepository);

    const telefone = await telefonesRepository.findOne({ id });

    if (!telefone) {
      throw new CustomError(400, 'Telefone não encontrado!');
    }

    await telefonesRepository.delete({
      id
    });

    return telefone;
  }
}

export default DeleteTelefoneService;
