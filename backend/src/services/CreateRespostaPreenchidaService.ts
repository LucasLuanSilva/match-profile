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
    
    await getConnection().transaction(async transactionalEntityManager => {
      for(var i in respostas){
        const resposta = respostaPreenchidasRepository.create({
          nivel:respostas[i].nivel,
          questoes_id:respostas[i].questoes_id,
          respostas_id:respostas[i].respostas_id,
          testes_atribuidos_id:respostas[i].testes_atribuidos_id
        })
        await transactionalEntityManager.save(resposta);
      }
    });
    

    return null;
  }
}

export default CreateRespostaPreenchidaService;
