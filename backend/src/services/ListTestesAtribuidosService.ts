import { getCustomRepository } from "typeorm"
import TestesAtribuidosRepository from "../repositories/TestesAtribuidosRepository";
import CandidatosRepository from "../repositories/CandidatosRepository";
import TestesRepository from "../repositories/TestesRepository";

interface ITeste {
    id: string
}

class ListTestesAtribuidosService {
  async execute({
    usuarios_id
  }: ITeste) {

    const candidatosRepository = getCustomRepository(CandidatosRepository);

    const testesAtribuidosRepository = getCustomRepository(TestesAtribuidosRepository);

    const testesRepository = getCustomRepository(TestesRepository);


    const candidatos = await candidatosRepository.find({
        where:{
            usuarios_id
        },
        relations: [
            'vaga'
        ]
    });


    let testes = [];

    for(var i in candidatos){

        var testesBusca = await testesAtribuidosRepository.find({candidatos_id:candidatos[i].id});

        for(var y in testesBusca){
            
            const testeNome = await testesRepository.findOne({id:testesBusca[y].testes_id, versao:testesBusca[y].testes_versao  })

            testesBusca[y].teste = testeNome;

            testesBusca[y].vaga = candidatos[i].vaga;

        }

        testes = testes.concat(testesBusca)

    }

    return testes;
  }
}

export default ListTestesAtribuidosService;
