import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import VagasRepository from "../repositories/VagasRepository";
import VagasTestesRepository from "../repositories/VagasTestesRepository";

interface ITesteRequest {
  id: string;
  versao: string;
}

interface IVagaRequest {
  titulo: string;
  descricao: string;
  usuarios_empresariais_id_criou: string;
  usuarios_empresariais_empresas_id_criou: string;
  testes: Array<ITesteRequest>;
}

class CreateVagaService {
  async execute({
    titulo,
    descricao,
    usuarios_empresariais_id_criou,
    usuarios_empresariais_empresas_id_criou,
    testes
  }: IVagaRequest) {
    const vagasRepository = getCustomRepository(VagasRepository);
    const vagasTestesRepository = getCustomRepository(VagasTestesRepository);

    if (!titulo) {
      throw new CustomError(400, 'Informe um título!');
    }

    const vaga = vagasRepository.create({
      titulo,
      descricao,
      situacao: 1,
      usuarios_empresariais_id_criou,
      usuarios_empresariais_empresas_id_criou,
      usuarios_empresariais_id_alterou: usuarios_empresariais_id_criou,
      usuarios_empresariais_empresas_id_alterou: usuarios_empresariais_empresas_id_criou,
    });

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(vaga);

      for (var i in testes) {
        const vagaTeste = vagasTestesRepository.create({
          vagas_id: vaga.id,
          testes_id: testes[i].id,
          testes_versao: Number(testes[i].versao)
        });

        await transactionalEntityManager.save(vagaTeste);
      }
    });

    return vaga;
  }
}

export default CreateVagaService;
