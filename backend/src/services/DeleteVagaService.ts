import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import VagasRepository from "../repositories/VagasRepository";

interface IVagaRequest {
  id: string;
  usuarios_empresariais_empresas_id_criou: string;
}

class DeleteVagaService {
  async execute({
    id,
    usuarios_empresariais_empresas_id_criou
  }: IVagaRequest) {
    const vagasRepository = getCustomRepository(VagasRepository);

    if (!id) {
      throw new CustomError(400, "Vaga não encontrada!");
    }

    const currentVaga = await vagasRepository.findOne({
      id
    });

    if (!currentVaga) {
      throw new CustomError(400, "Vaga não encontrada!");
    }

    if (currentVaga?.usuarios_empresariais_empresas_id_criou != usuarios_empresariais_empresas_id_criou) {
      throw new CustomError(400, "Não é permitido a exclusão de vagas de outras empresas!");
    }

    const newVagaData = {
      ...currentVaga,
      situacao: 0
    }

    await vagasRepository
      .update({ id }, newVagaData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newVagaData;
  }
}

export default DeleteVagaService;
