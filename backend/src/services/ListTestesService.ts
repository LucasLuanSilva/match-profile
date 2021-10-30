import { getCustomRepository } from "typeorm"
import TestesRepository from "../repositories/TestesRepository";

class ListTestesService {
  async execute() {
    const testesRepository = getCustomRepository(TestesRepository);

    const testes = await testesRepository.find();

    return testes;
  }
}

export default ListTestesService;
