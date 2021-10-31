import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import TestesRepository from "../repositories/TestesRepository";

interface ITesteRequest {
  id: string;
  versao: number | string;
  empresas_id: string;
}

class DeleteTesteService {
  async execute({
    id,
    versao,
    empresas_id
  }: ITesteRequest) {
    const testesRepository = getCustomRepository(TestesRepository);

    if (!id || !versao) {
      throw new CustomError(400, "Teste não encontrado!");
    }

    const currentTeste = await testesRepository.findOne({
      id,
      versao: Number(versao)
    });

    if (!currentTeste) {
      throw new CustomError(400, "Teste não encontrado!");
    }

    if (currentTeste?.usuarios_empresariais_empresas_id != empresas_id) {
      throw new CustomError(400, "Não é permitido a exclusão de testes de outra empresa!");
    }

    const newTesteData = {
      ...currentTeste,
      situacao: 0
    }

    await testesRepository
      .update({ id, versao: Number(versao) }, newTesteData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newTesteData;
  }
}

export default DeleteTesteService;
