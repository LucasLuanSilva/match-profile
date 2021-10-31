import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import Teste from "../entities/Teste";
import QuestoesRepository from "../repositories/QuestoesRepository";
import RespostasRepository from "../repositories/RespostasRepository";
import TestesRepository from "../repositories/TestesRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

interface IRespostaRequest {
  resposta: string;
  correta: number;
  pontuacao: number;
}

interface IQuestoesRequest {
  pergunta: string;
  tipo: number;
  respostas: Array<IRespostaRequest>
}

interface ITesteRequest {
  id?: string,
  versao?: string | number,
  situacao: number,
  titulo: string,
  descricao: string,
  usuarios_empresariais_id: string,
  usuarios_empresariais_empresas_id: string,
  questoes: Array<IQuestoesRequest>
}

class CreateTesteService {
  async execute({
    id,
    versao,
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
      id: id && versao ? id : undefined,
      versao: id && versao ? Number(versao) + 1 : undefined,
      titulo,
      descricao,
      situacao,
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    });

    await getConnection().transaction(async transactionalEntityManager => {


      if (id && versao) {
        const currentTeste = await testesRepository.findOne({
          id,
          versao: Number(versao)
        });

        const newTesteData = {
          ...currentTeste,
          situacao: 0
        }

        await transactionalEntityManager
          .update(Teste, { id, versao: Number(versao) }, newTesteData)
          .catch(err => {
            throw new CustomError(400, err.message);
          });
      }

      await transactionalEntityManager.save(teste);

      for (var i in questoes) {
        const { pergunta, tipo, respostas } = questoes[i];

        const questao = questoesRepository.create({
          pergunta,
          tipo,
          testes_id: teste.id,
          testes_versao: teste.versao
        });

        await transactionalEntityManager.save(questao);

        for (var j in respostas) {
          const { resposta, correta, pontuacao } = respostas[j];

          const objResposta = respostasRepository.create({
            questoes_id: questao.id,
            resposta,
            correta,
            pontuacao
          });

          await transactionalEntityManager.save(objResposta);
        }
      }
    });

    return teste;
  }
}

export default CreateTesteService;
