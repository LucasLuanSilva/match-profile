import { getCustomRepository } from "typeorm";
import TelefonesRepository from "../repositories/TelefonesRepository";

class ListTelefonesService {
  async execute(
    usuarios_id?: string,
    usuarios_empresariais_id?: string,
    usuarios_empresariais_empresas_id?: string
  ) {
    const telefonesRepository = getCustomRepository(TelefonesRepository);

    var telefones = [];

    if (usuarios_empresariais_id) {
      telefones = await telefonesRepository.find({
        usuarios_empresariais_id,
        usuarios_empresariais_empresas_id
      });
    } else {
      telefones = await telefonesRepository.find({
        usuarios_id
      });
    }

    return telefones;
  }
}

export default ListTelefonesService;
