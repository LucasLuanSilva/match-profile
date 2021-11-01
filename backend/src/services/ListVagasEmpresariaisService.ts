import { getCustomRepository } from "typeorm";
import VagasRepository from "../repositories/VagasRepository";

interface IRequestVaga {
  usuarios_empresariais_empresas_id_criou: string
}

class ListVagasEmpresariaisService {
  async execute({
    usuarios_empresariais_empresas_id_criou
  }: IRequestVaga) {
    const vagasRepository = getCustomRepository(VagasRepository);

    let vagas = await vagasRepository.find({
      usuarios_empresariais_empresas_id_criou,
      situacao: 1
    });

    return vagas;
  }
}

export default ListVagasEmpresariaisService;
