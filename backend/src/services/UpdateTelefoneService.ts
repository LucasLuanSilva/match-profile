import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import Telefone from "../entities/Telefone";
import TelefonesRepository from "../repositories/TelefonesRepository";

interface ITelefoneRequest {
  id: string;
  ddd: string;
  numero: string;
  tipo: number | string;
  contato?: string;
}

class UpdateTelefoneService {
  async execute({
    id,
    ddd,
    numero,
    tipo,
    contato,
  }: ITelefoneRequest) {
    const telefonesRepository = getCustomRepository(TelefonesRepository);

    if (!ddd || ddd.replace(/[^\d]+/g, '').length != 2) {
      throw new CustomError(400, "Informe um DDD valido.");
    }
    ddd = ddd.replace(/[^\d]+/g, '');

    if (!numero || (numero.replace(/[^\d]+/g, '').length != 8 && numero.replace(/[^\d]+/g, '').length != 9)) {
      throw new CustomError(400, "Infome um número valido.");
    }
    numero = numero.replace(/[^\d]+/g, '');

    if ([0, 1, 2].indexOf(Number(tipo)) == -1) {
      throw new CustomError(400, "Informe um tipo valido.");
    }
    tipo = Number(tipo);

    const currentTelefone = await telefonesRepository.findOne({
      id
    });

    const newTelefoneData: Telefone = {
      ...currentTelefone,
      ddd,
      numero,
      tipo,
      contato
    }

    await telefonesRepository
      .update({ id }, newTelefoneData)
      .catch(err => {
        throw new CustomError(400, err.message);
      });

    return newTelefoneData;
  }
}

export default UpdateTelefoneService;
