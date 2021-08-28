import { Request, Response } from "express";

import CreateEmpresaService from "../services/CreateEmpresaService";

class CreateEmpresaController {
  async handle(request: Request, response: Response) {
    const {
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
      situacao
    } = request.body;

    const createEmpresaService = new CreateEmpresaService();

    const empresa = await createEmpresaService.execute({
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
      situacao
    });

    return response.json(empresa);
  }
}

export default CreateEmpresaController;
