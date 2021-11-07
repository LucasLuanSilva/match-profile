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
          const { resposta, perfil } = respostas[j];

          const objResposta = respostasRepository.create({
            questoes_id: questao.id,
            resposta,
            perfil: Number(perfil)
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
              resposta: 'Assertiva',
              perfil: 0
            },
            {
              resposta: 'Persuasiva',
              perfil: 1
            },
            {
              resposta: 'Paciente',
              perfil: 2
            },
            {
              resposta: 'Contemplativa',
              perfil: 3
            }
          ]
        },
        {
          pergunta: 'Confortável com...',
          respostas: [
            {
              resposta: 'Ser decisivo',
              perfil:0
            },
            {
              resposta: 'Amizade social',
              perfil:1
            },
            {
              resposta: 'Ser parte de um time',
              perfil:2
            },
            {
              resposta: 'Planejamento e ordem',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Desejo de...',
          respostas: [
            {
              resposta: 'Variedade',
              perfil:0
            },
            {
              resposta: 'Menos estrutura',
              perfil:1
            },
            {
              resposta: 'Harmonia',
              perfil:2
            },
            {
              resposta: 'Lógica',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Sob estresse pode se tornar...',
          respostas: [
            {
              resposta: 'Ditatorial',
              perfil:0
            },
            {
              resposta: 'Sarcástico',
              perfil:1
            },
            {
              resposta: 'Submisso',
              perfil:2
            },
            {
              resposta: 'Arredio',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Característica principal...',
          respostas: [
            {
              resposta: 'Franco',
              perfil:0
            },
            {
              resposta: 'Otimista',
              perfil:1
            },
            {
              resposta: 'Serviçal',
              perfil:2
            },
            {
              resposta: 'Ordeiro',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Quando em conflito, esse estilo...',
          respostas: [
            {
              resposta: 'Demanda ação',
              perfil:0
            },
            {
              resposta: 'Ataca',
              perfil:1
            },
            {
              resposta: 'Reclama',
              perfil:2
            },
            {
              resposta: 'Evita',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Força aparente...',
          respostas: [
            {
              resposta: 'Solucionador de problemas',
              perfil:0
            },
            {
              resposta: 'Encorajador',
              perfil:1
            },
            {
              resposta: 'Supporter',
              perfil:2
            },
            {
              resposta: 'Organizador',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Com erros...',
          respostas: [
            {
              resposta: 'Informa o erro diretamente',
              perfil:0
            },
            {
              resposta: 'Chama a pessoa e explica o erro',
              perfil:1
            },
            {
              resposta: 'Fica calado e aceita o erro',
              perfil:2
            },
            {
              resposta: 'Se incomoda e questiona',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Sob estresse pode se tornar...',
          respostas: [
            {
              resposta: 'Crítico',
              perfil:0
            },
            {
              resposta: 'Superficial',
              perfil:1
            },
            {
              resposta: 'Indeciso',
              perfil:2
            },
            {
              resposta: 'Cabeça dura',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Pode ser considerado...',
          respostas: [
            {
              resposta: 'Impaciente',
              perfil:0
            },
            {
              resposta: 'Inoportuno',
              perfil:1
            },
            {
              resposta: 'Indeciso',
              perfil:2
            },
            {
              resposta: 'Inseguro',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Necessita de...',
          respostas: [
            {
              resposta: 'Controle',
              perfil:0
            },
            {
              resposta: 'Aprovação',
              perfil:1
            },
            {
              resposta: 'Rotina',
              perfil:2
            },
            {
              resposta: 'Padrão',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Limitação desse perfil...',
          respostas: [
            {
              resposta: 'Direto',
              perfil:0
            },
            {
              resposta: 'Desorganizado',
              perfil:1
            },
            {
              resposta: 'Indireto',
              perfil:2
            },
            {
              resposta: 'Detalhista',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Possui medo de...',
          respostas: [
            {
              resposta: 'Perder',
              perfil:0
            },
            {
              resposta: 'Rejeição',
              perfil:1
            },
            {
              resposta: 'Mudanças bruscas',
              perfil:2
            },
            {
              resposta: 'Estar errado',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Mensura desempenho com...',
          respostas: [
            {
              resposta: 'Resultados',
              perfil:0
            },
            {
              resposta: 'Reconhecimento',
              perfil:1
            },
            {
              resposta: 'Compatibilidade',
              perfil:2
            },
            {
              resposta: 'Precisão',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Com subalternos, costuma ser...',
          respostas: [
            {
              resposta: 'Orgulhoso',
              perfil:0
            },
            {
              resposta: 'Permissivo',
              perfil:1
            },
            {
              resposta: 'Humilde',
              perfil:2
            },
            {
              resposta: 'Cauteloso',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Abordagem primária...',
          respostas: [
            {
              resposta: 'Independente',
              perfil:0
            },
            {
              resposta: 'Interativo',
              perfil:1
            },
            {
              resposta: 'Estável',
              perfil:2
            },
            {
              resposta: 'Corretivo',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Outra limitação desse perfil...',
          respostas: [
            {
              resposta: 'Intenso',
              perfil:0
            },
            {
              resposta: 'Não tradicional',
              perfil:1
            },
            {
              resposta: 'Indeciso',
              perfil:2
            },
            {
              resposta: 'Impessoal',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Ponto cego...',
          respostas: [
            {
              resposta: 'Ser responsabilizado',
              perfil:0
            },
            {
              resposta: 'Realizar compromissos',
              perfil:1
            },
            {
              resposta: 'Necessidade de mudança',
              perfil:2
            },
            {
              resposta: 'Tomada de decisão',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Mensura desempenho com...',
          respostas: [
            {
              resposta: 'Histórico',
              perfil:0
            },
            {
              resposta: 'Elogios',
              perfil:1
            },
            {
              resposta: 'Contribuição',
              perfil:2
            },
            {
              resposta: 'Qualidade dos resultados',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Prefere tarefas...',
          respostas: [
            {
              resposta: 'Desafiadoras',
              perfil:0
            },
            {
              resposta: 'Relacionada a pessoas',
              perfil:1
            },
            {
              resposta: 'Agendadas',
              perfil:2
            },
            {
              resposta: 'Estruturadas',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Com atrasos...',
          respostas: [
            {
              resposta: 'Se irrita e confronta',
              perfil:0
            },
            {
              resposta: 'Nem liga, está distraído',
              perfil:1
            },
            {
              resposta: 'Sabe do atraso, mas aceita',
              perfil:2
            },
            {
              resposta: 'Reclama e analisa a situação',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Em situações extremas...',
          respostas: [
            {
              resposta: 'Se preocupa demais com metas',
              perfil:0
            },
            {
              resposta: 'Fala sem pensar',
              perfil:1
            },
            {
              resposta: 'Procrastina ao invés de fazer',
              perfil:2
            },
            {
              resposta: 'Analisa demais',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Precisa melhorar...',
          respostas: [
            {
              resposta: 'Empatia e Paciência',
              perfil:0
            },
            {
              resposta: 'Controle emocional',
              perfil:1
            },
            {
              resposta: 'Ser assertivo sob pressão',
              perfil:2
            },
            {
              resposta: 'Se preocupar menos sobre tudo',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Em uma discussão...',
          respostas: [
            {
              resposta: 'Busca ter a razão',
              perfil:0
            },
            {
              resposta: 'Busca diminuir o conflito',
              perfil:1
            },
            {
              resposta: 'Busca concordância',
              perfil:2
            },
            {
              resposta: 'Busca comprovar sua opinião',
              perfil:3
            }
          ]
        },
        {
          pergunta: 'Quando vai às compras...',
          respostas: [
            {
              resposta: 'Sabe o que quer',
              perfil:0
            },
            {
              resposta: 'Se diverte',
              perfil:1
            },
            {
              resposta: 'Fica indeciso',
              perfil:2
            },
            {
              resposta: 'Busca ofertas',
              perfil:3
            }
          ]
        },
      ]
    }
  }
}

export default CreateEmpresaService;
