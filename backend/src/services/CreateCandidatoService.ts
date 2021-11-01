import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CandidatosRepository from "../repositories/CandidatosRepository";
import TestesAtribuidosRepository from "../repositories/TestesAtribuidosRepository";
import VagasRepository from "../repositories/VagasRepository";
import VagasTestesRepository from "../repositories/VagasTestesRepository";

interface ICandidatoRequest {
  vagas_id: string;
  usuarios_id: string;
}

class CreateCandidatoService {
  async execute({
    vagas_id,
    usuarios_id
  }: ICandidatoRequest) {
    const testesAtribuidosRepository = getCustomRepository(TestesAtribuidosRepository);
    const candidatosRepository = getCustomRepository(CandidatosRepository);
    const vagasTestesRepository = getCustomRepository(VagasTestesRepository);
    const vagasRepository = getCustomRepository(VagasRepository);

    const vaga = await vagasRepository.findOne({ id: vagas_id });

    const vagasTestes = await vagasTestesRepository.find({ vagas_id });

    const candidatoExiste = await candidatosRepository.findOne({ usuarios_id, vagas_id });

    if (candidatoExiste) {
      throw new CustomError(400, 'Você já se candidatou a essa vaga!');
    }

    const candidato = candidatosRepository.create({
      usuarios_id,
      vagas_id
    });

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(candidato);

      for (var i in vagasTestes) {
        const testeAtribuido = testesAtribuidosRepository.create({
          candidatos_id: candidato.id,
          usuarios_empresariais_id: vaga?.usuarios_empresariais_id_criou,
          usuarios_empresariais_empresas_id: vaga?.usuarios_empresariais_empresas_id_criou,
          testes_id: vagasTestes[i].testes_id,
          testes_versao: vagasTestes[i].testes_versao
        });

        await transactionalEntityManager.save(testeAtribuido);
      }
    });

    return candidato;
  }
}

export default CreateCandidatoService;
