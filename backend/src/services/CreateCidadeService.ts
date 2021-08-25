import { getCustomRepository } from "typeorm";

import CidadesRepository from "../repositories/CidadesRepository";
import CustomError from "../class/CustomError";

interface Request {
  codigo_municipio: string;
  nome: string;
  uf: string;
}

class CreateCidadeService {
  async execute({ codigo_municipio, nome, uf }: Request) {
    const cidadesRepository = getCustomRepository(CidadesRepository);

    if (!codigo_municipio || codigo_municipio.length != 7) {
      throw new CustomError(400, "Informe um código de município válido.");
    }

    if (!nome) {
      throw new CustomError(400, "Informe o nome da cidade.");
    }

    if (!uf || uf.length != 2) {
      throw new CustomError(400, "Informe um UF válido.");
    }

    const cidadeJaExiste = await cidadesRepository.findOne({
      codigo_municipio
    });

    if (cidadeJaExiste) {
      throw new CustomError(400, 'Cidade já está cadastrada.');
    }

    const cidade = cidadesRepository.create({
      codigo_municipio,
      nome,
      uf
    });

    await cidadesRepository.save(cidade);

    return cidade;
  }
}

export default CreateCidadeService;
