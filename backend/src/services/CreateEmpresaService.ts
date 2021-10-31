import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import { cnpj as cnpjValidator, cpf as cpfValidator } from "cpf-cnpj-validator";
import { hash } from "bcryptjs";
import dayjs from "dayjs";

import CidadesRepository from "../repositories/CidadesRepository";
import EmpresasRepository from "../repositories/EmpresasRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";
import QuestoesRepository from "../repositories/QuestoesRepository";
import RespostasRepository from "../repositories/RespostasRepository";
import TestesRepository from "../repositories/TestesRepository";

interface IEmpresaRequest {
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  cep: string;
  cidades_codigo_municipio: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  site?: string;
  situacao: Number;
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

class CreateEmpresaService {
  async execute({
    cnpj,
    razao_social,
    nome_fantasia,
    cep,
    cidades_codigo_municipio,
    logradouro,
    numero,
    complemento,
    bairro,
    site,
    situacao,
    cpf,
    nome,
    sobrenome,
    email,
    senha
  }: IEmpresaRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const empresasRepository = getCustomRepository(EmpresasRepository);
    const cidadesRepository = getCustomRepository(CidadesRepository);
    const testesRepository = getCustomRepository(TestesRepository);
    const questoesRepository = getCustomRepository(QuestoesRepository);
    const respostasRepository = getCustomRepository(RespostasRepository);

    const empresaExiste = await empresasRepository.findOne({
      cnpj
    });

    if (empresaExiste) {
      throw new CustomError(400, 'A empresa já possui cadastro, para mais informações entre em contato!');
    }

    const cidadeExiste = await cidadesRepository.findOne(cidades_codigo_municipio);

    if (!cidadeExiste) {
      throw new CustomError(400, 'Cidade informada não encontrada!');
    }

    if (!cnpjValidator.isValid(cnpj)) {
      throw new CustomError(400, 'O CNPJ informado é inválido!');
    }

    const cpfExiste = await usuariosEmpresariaisRepository.findOne({
      cpf
    });

    if (cpfExiste) {
      throw new CustomError(400, 'Já existe um usuário com este CPF!');
    }

    const emailExiste = await usuariosEmpresariaisRepository.findOne({
      email
    });

    if (emailExiste) {
      throw new CustomError(400, 'Já existe um usuário com este email!');
    }

    if (!cpfValidator.isValid(cpf)) {
      throw new CustomError(400, 'Informe um CPF válido!');
    }

    const data_termino_contrato = new Date(dayjs().add(7, 'day').format());

    const empresa = empresasRepository.create({
      cnpj,
      razao_social,
      nome_fantasia,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      site,
      situacao,
      data_termino_contrato
    });

    const senhaHash = await hash(senha, 8);

    const usuarioEmpresarial = usuariosEmpresariaisRepository.create({
      empresas_id: empresa.id,
      cpf,
      nome,
      sobrenome,
      email,
      senha: senhaHash,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      situacao,
      nivel: 1
    });

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(empresa);
      await transactionalEntityManager.save(usuarioEmpresarial);

      const { situacao, tipo, descricao, titulo, questoes } = this.getTesteDISC();

      const teste = testesRepository.create({
        titulo,
        descricao,
        situacao,
        tipo,
        usuarios_empresariais_id: usuarioEmpresarial.id,
        usuarios_empresariais_empresas_id: usuarioEmpresarial.empresas_id
      });

      await transactionalEntityManager.save(teste);

      for (var i in questoes) {
        const { pergunta, respostas } = questoes[i];

        const questao = questoesRepository.create({
          pergunta,
          tipo,
          testes_id: teste.id,
          testes_versao: teste.versao
        });

        await transactionalEntityManager.save(questao);

        for (var j in respostas) {
          const { resposta } = respostas[j];

          const objResposta = respostasRepository.create({
            questoes_id: questao.id,
            resposta
          });

          await transactionalEntityManager.save(objResposta);
        }
      }
    });

    return empresa;
  }

  getTesteDISC() {
    return {
      situacao: 1,
      titulo: 'Teste D.I.S.C',
      descricao: 'Saiba seu perfil DISC \nPara cada questão, enumere de 1 a 4, onde 4 é a opção que MAIS identifica você e 1 é o que MENOS identifica. \nNão preencha valores repetidos.',
      tipo: 1,
      questoes: [
        {
          pergunta: 'Tende a agir de forma...',
          respostas: [
            {
              resposta: 'Assertiva'
            },
            {
              resposta: 'Persuasiva'
            },
            {
              resposta: 'Paciente'
            },
            {
              resposta: 'Contemplativa'
            }
          ]
        },
        {
          pergunta: 'Confortável com...',
          respostas: [
            {
              resposta: 'Ser decisivo'
            },
            {
              resposta: 'Amizade social'
            },
            {
              resposta: 'Ser parte de um time'
            },
            {
              resposta: 'Planejamento e ordem'
            }
          ]
        },
        {
          pergunta: 'Desejo de...',
          respostas: [
            {
              resposta: 'Variedade'
            },
            {
              resposta: 'Menos estrutura'
            },
            {
              resposta: 'Harmonia'
            },
            {
              resposta: 'Lógica'
            }
          ]
        },
        {
          pergunta: 'Sob estresse pode se tornar...',
          respostas: [
            {
              resposta: 'Ditatorial'
            },
            {
              resposta: 'Sarcástico'
            },
            {
              resposta: 'Submisso'
            },
            {
              resposta: 'Arredio'
            }
          ]
        },
        {
          pergunta: 'Característica principal...',
          respostas: [
            {
              resposta: 'Franco'
            },
            {
              resposta: 'Otimista'
            },
            {
              resposta: 'Serviçal'
            },
            {
              resposta: 'Ordeiro'
            }
          ]
        },
        {
          pergunta: 'Quando em conflito, esse estilo...',
          respostas: [
            {
              resposta: 'Demanda ação'
            },
            {
              resposta: 'Ataca'
            },
            {
              resposta: 'Reclama'
            },
            {
              resposta: 'Evita'
            }
          ]
        },
        {
          pergunta: 'Força aparente...',
          respostas: [
            {
              resposta: 'Solucionador de problemas'
            },
            {
              resposta: 'Encorajador'
            },
            {
              resposta: 'Supporter'
            },
            {
              resposta: 'Organizador'
            }
          ]
        },
        {
          pergunta: 'Com erros...',
          respostas: [
            {
              resposta: 'Informa o erro diretamente'
            },
            {
              resposta: 'Chama a pessoa e explica o erro'
            },
            {
              resposta: 'Fica calado e aceita o erro'
            },
            {
              resposta: 'Se incomoda e questiona'
            }
          ]
        },
        {
          pergunta: 'Sob estresse pode se tornar...',
          respostas: [
            {
              resposta: 'Crítico'
            },
            {
              resposta: 'Superficial'
            },
            {
              resposta: 'Indeciso'
            },
            {
              resposta: 'Cabeça dura'
            }
          ]
        },
        {
          pergunta: 'Pode ser considerado...',
          respostas: [
            {
              resposta: 'Impaciente'
            },
            {
              resposta: 'Inoportuno'
            },
            {
              resposta: 'Indeciso'
            },
            {
              resposta: 'Inseguro'
            }
          ]
        },
        {
          pergunta: 'Necessita de...',
          respostas: [
            {
              resposta: 'Controle'
            },
            {
              resposta: 'Aprovação'
            },
            {
              resposta: 'Rotina'
            },
            {
              resposta: 'Padrão'
            }
          ]
        },
        {
          pergunta: 'Limitação desse perfil...',
          respostas: [
            {
              resposta: 'Direto'
            },
            {
              resposta: 'Desorganizado'
            },
            {
              resposta: 'Indireto'
            },
            {
              resposta: 'Detalhista'
            }
          ]
        },
        {
          pergunta: 'Possui medo de...',
          respostas: [
            {
              resposta: 'Perder'
            },
            {
              resposta: 'Rejeição'
            },
            {
              resposta: 'Mudanças bruscas'
            },
            {
              resposta: 'Estar errado'
            }
          ]
        },
        {
          pergunta: 'Mensura desempenho com...',
          respostas: [
            {
              resposta: 'Resultados'
            },
            {
              resposta: 'Reconhecimento'
            },
            {
              resposta: 'Compatibilidade'
            },
            {
              resposta: 'Precisão'
            }
          ]
        },
        {
          pergunta: 'Com subalternos, costuma ser...',
          respostas: [
            {
              resposta: 'Orgulhoso'
            },
            {
              resposta: 'Permissivo'
            },
            {
              resposta: 'Humilde'
            },
            {
              resposta: 'Cauteloso'
            }
          ]
        },
        {
          pergunta: 'Abordagem primária...',
          respostas: [
            {
              resposta: 'Independente'
            },
            {
              resposta: 'Interativo'
            },
            {
              resposta: 'Estável'
            },
            {
              resposta: 'Corretivo'
            }
          ]
        },
        {
          pergunta: 'Outra limitação desse perfil...',
          respostas: [
            {
              resposta: 'Intenso'
            },
            {
              resposta: 'Não tradicional'
            },
            {
              resposta: 'Indeciso'
            },
            {
              resposta: 'Impessoal'
            }
          ]
        },
        {
          pergunta: 'Ponto cego...',
          respostas: [
            {
              resposta: 'Ser responsabilizado'
            },
            {
              resposta: 'Realizar compromissos'
            },
            {
              resposta: 'Necessidade de mudança'
            },
            {
              resposta: 'Tomada de decisão'
            }
          ]
        },
        {
          pergunta: 'Mensura desempenho com...',
          respostas: [
            {
              resposta: 'Histórico'
            },
            {
              resposta: 'Elogios'
            },
            {
              resposta: 'Contribuição'
            },
            {
              resposta: 'Qualidade dos resultados'
            }
          ]
        },
        {
          pergunta: 'Prefere tarefas...',
          respostas: [
            {
              resposta: 'Desafiadoras'
            },
            {
              resposta: 'Relacionada a pessoas'
            },
            {
              resposta: 'Agendadas'
            },
            {
              resposta: 'Estruturadas'
            }
          ]
        },
        {
          pergunta: 'Com atrasos...',
          respostas: [
            {
              resposta: 'Se irrita e confronta'
            },
            {
              resposta: 'Nem liga, está distraído'
            },
            {
              resposta: 'Sabe do atraso, mas aceita'
            },
            {
              resposta: 'Reclama e analisa a situação'
            }
          ]
        },
        {
          pergunta: 'Em situações extremas...',
          respostas: [
            {
              resposta: 'Se preocupa demais com metas'
            },
            {
              resposta: 'Fala sem pensar'
            },
            {
              resposta: 'Procrastina ao invés de fazer'
            },
            {
              resposta: 'Analisa demais'
            }
          ]
        },
        {
          pergunta: 'Precisa melhorar...',
          respostas: [
            {
              resposta: 'Empatia e Paciência'
            },
            {
              resposta: 'Controle emocional'
            },
            {
              resposta: 'Ser assertivo sob pressão'
            },
            {
              resposta: 'Se preocupar menos sobre tudo'
            }
          ]
        },
        {
          pergunta: 'Em uma discussão...',
          respostas: [
            {
              resposta: 'Busca ter a razão'
            },
            {
              resposta: 'Busca diminuir o conflito'
            },
            {
              resposta: 'Busca concordância'
            },
            {
              resposta: 'Busca comprovar sua opinião'
            }
          ]
        },
        {
          pergunta: 'Quando vai às compras...',
          respostas: [
            {
              resposta: 'Sabe o que quer'
            },
            {
              resposta: 'Se diverte'
            },
            {
              resposta: 'Fica indeciso'
            },
            {
              resposta: 'Busca ofertas'
            }
          ]
        },
      ]
    }
  }
}

export default CreateEmpresaService;
