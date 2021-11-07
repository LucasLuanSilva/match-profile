import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import RespostasPreenchidasRepository from "../repositories/RespostasPreenchidasRepository";

interface IRespostaPreenchidaRequest {
	respostas:[]
}

class CreateRespostaPreenchidaService {
  async execute({
    respostas
  }: IRespostaPreenchidaRequest) {
    const respostaPreenchidasRepository = getCustomRepository(RespostasPreenchidasRepository)
    let Dominante = 0;
      let Influente = 0;
      let Estavel = 0;
      let Cauteloso = 0;
    console.log(respostas)
    await getConnection().transaction(async transactionalEntityManager => {
      for(var i in respostas){
        const resposta = respostaPreenchidasRepository.create({
          nivel:respostas[i].nivel,
          questoes_id:respostas[i].questoes_id,
          respostas_id:respostas[i].respostas_id,
          testes_atribuidos_id:respostas[i].testes_atribuidos_id
        })
        await transactionalEntityManager.save(resposta);
        let index = respostas[i].perfil;
        
        
        switch(index){
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
    }).catch(err => {
      console.log(err.message);
      return
    });;
      let valores = [];
      let perfil = "";
      valores.push(Dominante)
      valores.push(Influente)
      valores.push(Estavel)
      valores.push(Cauteloso)
      console.log(valores)
      let valor = valores.indexOf(Math.max(...valores));
      switch(valor){
        case 0:
          perfil = "Dominante";
          break;
        case 1:
          perfil = "Influente";
          break;
        case 2:
          perfil = "Estavel";
          break;
        case 3:
          perfil = "Cauteloso";
          break;
        default:
          perfil = "Indefinido";
          break;
      }
    return perfil;
  }
}

export default CreateRespostaPreenchidaService;
