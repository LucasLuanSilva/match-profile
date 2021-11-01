import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";

interface ITesteRequest {
  id: string;
  versao: string;
}

interface IVagaRequest {
  titulo: string;
  descricao: string;
  testes: Array<ITesteRequest>;
}

class CreateVagaService {
  async execute({
    titulo,
    descricao,
    testes
  }: IVagaRequest) {
    const experienciasRepository = getCustomRepository(ExperienciasRepository)

    const experiencia = await experienciasRepository.create({
      empresa,
      cargo,
      descricao,
      data_inicio: new Date(data_inicio),
      data_termino: new Date(data_termino),
      curriculos_id
    });

    await experienciasRepository.save(experiencia);

    return experiencia;
  }
}

export default CreateVagaService;
