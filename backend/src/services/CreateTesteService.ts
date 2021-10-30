import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import QuestoesRepository from "../repositories/QuestoesRepository";
import RespostasRepository from "../repositories/RespostasRepository";
import TestesRepository from "../repositories/TestesRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

interface IRespostaRequest {
  resposta: string;
  correta: number;
}

interface IQuestoesRequest {
  pergunta: string;
  respostas: Array<IRespostaRequest>
}

interface ITesteRequest {
  situacao: number,
  titulo: string,
  descricao: string,
  usuarios_empresariais_id: string,
  usuarios_empresariais_empresas_id: string,
  questoes: Array<IQuestoesRequest>
}

class CreateTesteService {
  async execute({
    situacao,
    titulo,
    descricao,
    usuarios_empresariais_id,
    usuarios_empresariais_empresas_id,
    questoes
  }: ITesteRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const testesRepository = getCustomRepository(TestesRepository);
    const questoesRepository = getCustomRepository(QuestoesRepository);
    const respostasRepository = getCustomRepository(RespostasRepository);

    const usuarioEmpresarial = await usuariosEmpresariaisRepository.findOne({
      id: usuarios_empresariais_id,
      empresas_id: usuarios_empresariais_empresas_id
    });
    if (!usuarioEmpresarial) {
      throw new CustomError(400, 'O usuário informado não existe!');
    }

    if (!situacao || (situacao != 0 && situacao != 1)) {
      throw new CustomError(400, 'Informe uma situação válida!');
    }

    if (!titulo) {
      throw new CustomError(400, 'Informe um titulo!');
    }

    if (!descricao) {
      throw new CustomError(400, 'Informe uma descrição!');
    }

    for (var i in questoes) {
      if (!questoes[i].pergunta) {
        throw new CustomError(400, 'Informe uma pergunta valida!');
      }

      let respostaValida = true;

      for (var j in questoes[i].respostas) {
        const { resposta } = questoes[i].respostas[j];

        if (!resposta) {
          respostaValida = false;
          break
        }
      };

      if (!respostaValida) {
        throw new CustomError(400, 'Informe respostas validas!');
      }
    }

    const teste = testesRepository.create({
      titulo,
      descricao,
      situacao,
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    });

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(teste);

      for (var i in questoes) {
        const { pergunta, respostas } = questoes[i];

        const questao = questoesRepository.create({
          pergunta,
          testes_id: teste.id,
          testes_versao: teste.versao
        });

        await transactionalEntityManager.save(questao);

        for (var j in respostas) {
          const { resposta, correta } = respostas[j];

          const objResposta = respostasRepository.create({
            questoes_id: questao.id,
            resposta,
            correta
          });

          await transactionalEntityManager.save(objResposta);
        }
      }
    });

    return teste;
  }
}

export default CreateTesteService;
