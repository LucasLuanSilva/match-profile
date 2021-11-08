import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import TesteAtribuido from "../entities/TesteAtribuido";
import RespostasPreenchidasRepository from "../repositories/RespostasPreenchidasRepository";
import TestesAtribuidosRepository from "../repositories/TestesAtribuidosRepository";
import TestesRepository from "../repositories/TestesRepository";

interface IRespostaPreenchidaRequest {
  testes_atribuidos_id: string,
  respostas: []
}

class CreateRespostaPreenchidaService {
  async execute({
    testes_atribuidos_id,
    respostas
  }: IRespostaPreenchidaRequest) {
    const respostaPreenchidasRepository = getCustomRepository(RespostasPreenchidasRepository);
    const testesAtribuidosRepository = getCustomRepository(TestesAtribuidosRepository);
    const testesRepository = getCustomRepository(TestesRepository);

    const testeAtribuido = await testesAtribuidosRepository.findOne({
      id: testes_atribuidos_id
    });

    const { tipo } = await testesRepository.findOne({
      id: testeAtribuido?.testes_id,
      versao: testeAtribuido?.testes_versao
    });
    console.log(tipo)

    await getConnection().transaction(async transactionalEntityManager => {
      for (var i in respostas) {
        console.log(respostas[i])
        if (tipo == 1 || (tipo == 0 && respostas[i].selecionada)) {
          const resposta = respostaPreenchidasRepository.create({
            nivel: respostas[i].nivel,
            questoes_id: respostas[i].questoes_id,
            respostas_id: respostas[i].respostas_id,
            testes_atribuidos_id: testes_atribuidos_id
          });

          await transactionalEntityManager.save(resposta);
        }
      }

      const newTesteAtribuidoData = {
        respondido: 1,
        data_respondido: new Date()
      }

      await transactionalEntityManager
        .update(TesteAtribuido, { id: testes_atribuidos_id }, newTesteAtribuidoData)
        .catch(err => {
          throw new CustomError(400, err.message);
        });
    }).catch(err => {
      console.log(err.message);
      return
    });

    let perfilAcerto = "Teste respondido com sucesso !";

    if (tipo == 1) {
      let Dominante = 0;
      let Influente = 0;
      let Estavel = 0;
      let Cauteloso = 0;

      for (var i in respostas) {
        let index = respostas[i].perfil;

        switch (index) {
          case 0:
            Dominante += respostas[i].nivel;
            break;
          case 1:
            Influente += respostas[i].nivel;
            break;
          case 2:
            Estavel += respostas[i].nivel;
            break;
          case 3:
            Cauteloso += respostas[i].nivel;
            break;
        }
      }

      let valores = [];

      valores.push(Dominante);
      valores.push(Influente);
      valores.push(Estavel);
      valores.push(Cauteloso);

      let valor = valores.indexOf(Math.max(...valores));
      switch (valor) {
        case 0:
          perfilAcerto = "Seu perfil é Dominante !";
          break;
        case 1:
          perfilAcerto = "Seu perfil é Influente !";
          break;
        case 2:
          perfilAcerto = "Seu perfil é Estável !";
          break;
        case 3:
          perfilAcerto = "Seu perfil é Cauteloso !";
          break;
        default:
          perfilAcerto = "Perfil indefinido !";
          break;
      }
    } else {

    }

    return perfilAcerto;
  }
}

export default CreateRespostaPreenchidaService;
