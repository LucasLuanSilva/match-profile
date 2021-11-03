import { getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import CandidatosRepository from "../repositories/CandidatosRepository";
import CidadesRepository from "../repositories/CidadesRepository";
import CompetenciasRepository from "../repositories/CompetenciasRepository";
import CurriculosRepository from "../repositories/CurriculosRepository";
import CursosRepository from "../repositories/CursosRepository";
import ExperienciasRepository from "../repositories/ExperienciasRepository";
import GraduacaoRepository from "../repositories/GraduacaoRepository";
import TelefonesRepository from "../repositories/TelefonesRepository";
import TestesAtribuidosRepository from "../repositories/TestesAtribuidosRepository";
import TestesRepository from "../repositories/TestesRepository";

interface ICandidatoRequest {
  id: string;
}

class GetCandidatoService {
  async execute({ id }: ICandidatoRequest) {
    const candidatosRepository = getCustomRepository(CandidatosRepository);
    const telefonesRepository = getCustomRepository(TelefonesRepository);
    const curriculosRepository = getCustomRepository(CurriculosRepository);
    const graduacaoRepository = getCustomRepository(GraduacaoRepository);
    const cursosRepository = getCustomRepository(CursosRepository);
    const experienciasRepository = getCustomRepository(ExperienciasRepository);
    const competenciasRepository = getCustomRepository(CompetenciasRepository);
    const testesRepository = getCustomRepository(TestesRepository);
    const testesAtribuidosRepository = getCustomRepository(TestesAtribuidosRepository);
    const cidadesRepository = getCustomRepository(CidadesRepository);

    var candidato = await candidatosRepository.findOne({
      where: {
        id
      },
      relations: ['usuario']
    });

    if (!candidato) {
      throw new CustomError(400, 'Candidato não encontrado !');
    }

    const cidade = await cidadesRepository.findOne({ codigo_municipio: candidato.usuario.cidades_codigo_municipio });

    candidato.usuario.cidade = cidade;

    const telefones = await telefonesRepository.find({ usuarios_id: candidato?.usuarios_id });

    const curriculo = await curriculosRepository.findOne({ usuarios_id: candidato?.usuarios_id });

    const graduacoes = await graduacaoRepository.find({ curriculos_id: curriculo?.id });

    const cursos = await cursosRepository.find({ curriculos_id: curriculo?.id });

    const experiencias = await experienciasRepository.find({ curriculos_id: curriculo?.id });

    const competencias = await competenciasRepository.find({ curriculos_id: curriculo?.id });

    candidato.telefones = telefones;
    candidato.graduacoes = graduacoes;
    candidato.cursos = cursos;
    candidato.experiencias = experiencias;
    candidato.competencias = competencias;

    let testesAtribuidos = await testesAtribuidosRepository.find({ candidatos_id: candidato?.id });

    for (var i in testesAtribuidos) {
      testesAtribuidos[i].teste = await testesRepository.findOne({
        id: testesAtribuidos[i].testes_id,
        versao: Number(testesAtribuidos[i].testes_versao)
      });
    }

    candidato.testesAtribuidos = testesAtribuidos;

    return candidato;
  }
}

export default GetCandidatoService;
