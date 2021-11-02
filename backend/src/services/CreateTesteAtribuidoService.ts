import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import TestesAtribuidosRepository from "../repositories/TestesAtribuidosRepository";

interface ITesteAtribuidoRequest {
  candidatos_id: string;
  testes_id: string;
  testes_versao: string;
  usuarios_empresariais_id: string;
  usuarios_empresariais_empresas_id: string;
}

class CreateTesteAtribuidoService {
  async execute({
    candidatos_id,
    testes_id,
    testes_versao,
    usuarios_empresariais_id,
    usuarios_empresariais_empresas_id
  }: ITesteAtribuidoRequest) {
    const testesAtribuidosRepository = getCustomRepository(TestesAtribuidosRepository);

    const testeAtribuidoExiste = await testesAtribuidosRepository.findOne({
      candidatos_id,
      testes_id,
      testes_versao: Number(testes_versao)
    });

    if (testeAtribuidoExiste) {
      throw new CustomError(400, 'Este teste já foi atribuido ao candidato selecionado!');
    }

    const testeAtribuido = testesAtribuidosRepository.create({
      candidatos_id,
      testes_id,
      testes_versao: Number(testes_versao),
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    });

    await testesAtribuidosRepository.save(testeAtribuido);

    return testeAtribuido;
  }
}

export default CreateTesteAtribuidoService;
