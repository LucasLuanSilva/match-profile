import { getCustomRepository } from "typeorm";
import axios from "axios";

import CidadesRepository from "../repositories/CidadesRepository";
import CustomError from "../class/CustomError";

interface ICidadeRequest {
  codigo_municipio: string;
  nome: string;
  uf: string;
}

class AtualizaTabelaCidadesService {
  async execute() {
    const cidadesRepository = getCustomRepository(CidadesRepository);
    let cidades: ICidadeRequest[] = [];

    await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios').then(
      async (response) => {
        for (var i in <any>response.data) {
          const { codigo_municipio, nome, uf }: ICidadeRequest = {
            codigo_municipio: String(response.data[i].id),
            nome: response.data[i].nome,
            uf: response.data[i].microrregiao.mesorregiao.UF.sigla
          };

          if (!codigo_municipio || codigo_municipio.length != 7) {
            throw new CustomError(400, "Informe um código de município válido.");
          }

          if (!nome) {
            throw new CustomError(400, "Informe o nome da cidade.");
          }

          if (!uf || uf.length != 2) {
            throw new CustomError(400, "Informe um UF válido.");
          }

          const cidadeJaExiste = await cidadesRepository.findOne({
            codigo_municipio
          });

          if (!cidadeJaExiste) {
            const cidade = cidadesRepository.create({
              codigo_municipio,
              nome,
              uf
            });

            await cidadesRepository.save(cidade);
            cidades.push(cidade);
          }
        }
      }
    ).catch(
      (error) => {
        throw new CustomError(400, error);
      }
    );

    return cidades;
  }
}

export default AtualizaTabelaCidadesService;
