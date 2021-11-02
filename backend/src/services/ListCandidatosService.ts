import { getCustomRepository } from "typeorm";
import CandidatosRepository from "../repositories/CandidatosRepository";
import VagasRepository from "../repositories/VagasRepository";

interface ICandidatoRequest {
  usuarios_empresariais_empresas_id_criou: string
}

class ListCandidatosService {
  async execute({ usuarios_empresariais_empresas_id_criou }: ICandidatoRequest) {
    const candidatosRepository = getCustomRepository(CandidatosRepository);
    const vagasRepository = getCustomRepository(VagasRepository);

    const vagas = await vagasRepository.find({
      usuarios_empresariais_empresas_id_criou
    });

    let candidatos = [];
    for (var i in vagas) {
      const candidatosBusca = await candidatosRepository.find({
        where: {
          vagas_id: vagas[i].id
        },
        relations: [
          'usuario'
        ]
      });

      candidatos = candidatos.concat(candidatosBusca);
    }

    return candidatos;
  }
}

export default ListCandidatosService;
