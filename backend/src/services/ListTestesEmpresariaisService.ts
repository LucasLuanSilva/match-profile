import { getCustomRepository, Not } from "typeorm"
import TestesRepository from "../repositories/TestesRepository";

interface IRequestTestes {
  usuarios_empresariais_id: string,
  usuarios_empresariais_empresas_id: string
}

class ListTestesEmpresariaisService {
  async execute({ usuarios_empresariais_id,
    usuarios_empresariais_empresas_id
  }: IRequestTestes) {
    const testesRepository = getCustomRepository(TestesRepository);

    const testes = await testesRepository.find({
      usuarios_empresariais_empresas_id,
      situacao: 1
    });

    return testes;
  }
}

export default ListTestesEmpresariaisService;
