import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import VagasRepository from "../repositories/VagasRepository";

interface IVagaRequest {
  id: string;
  titulo: string;
  descricao: string;
  usuarios_empresariais_id_alterou: string;
  usuarios_empresariais_empresas_id_alterou: string;
}

class UpdateVagaService {
  async execute({
    id,
    titulo,
    descricao,
    usuarios_empresariais_id_alterou,
    usuarios_empresariais_empresas_id_alterou
  }: IVagaRequest) {
    const vagasRepository = getCustomRepository(VagasRepository);

    if (!titulo) {
      throw new CustomError(400, 'Informe um título !');
    }

    const currentVaga = await vagasRepository.findOne({
      id
    });

    const newVagaData = {
      ...currentVaga,
      id,
      titulo,
      descricao,
      usuarios_empresariais_id_alterou,
      usuarios_empresariais_empresas_id_alterou,
      data_alteracao: new Date()
    }

    await vagasRepository
      .update({ id }, newVagaData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newVagaData;
  }
}

export default UpdateVagaService;
