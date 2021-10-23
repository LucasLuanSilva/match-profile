import { Request, Response } from "express";

import CreateUsuarioEmpresarialService from "../services/CreateUsuarioEmpresarialService";

import { decode } from 'jsonwebtoken';

class CreateUsuarioEmpresarialController {
  async handle(request: Request, response: Response) {
    const {
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
      nivel,
      telefones
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

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
      nivel,
      telefones
    });

    return response.json(usuarioEmpresarial);
  }
}

export default CreateUsuarioEmpresarialController;
