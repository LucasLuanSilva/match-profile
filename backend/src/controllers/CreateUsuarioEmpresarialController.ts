import { Request, Response } from "express";

import CreateUsuarioEmpresarialService from "../services/CreateUsuarioEmpresarialService";

class CreateUsuarioEmpresarialController {
  async handle(request: Request, response: Response) {
    const {
      empresas_id,
      cpf,
      nome,
      sobrenome,
      email,
      rg,
      senha,
      estado_civil,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      situacao,
      nivel
    } = request.body;

    const createUsuarioEmpresarialService = new CreateUsuarioEmpresarialService();

    const usuarioEmpresarial = await createUsuarioEmpresarialService.execute({
      empresas_id,
      cpf,
      nome,
      sobrenome,
      email,
      rg,
      senha,
      estado_civil,
      cep,
      cidades_codigo_municipio,
      logradouro,
      numero,
      complemento,
      bairro,
      situacao,
      nivel
    });

    return response.json(usuarioEmpresarial);
  }
}

export default CreateUsuarioEmpresarialController;
