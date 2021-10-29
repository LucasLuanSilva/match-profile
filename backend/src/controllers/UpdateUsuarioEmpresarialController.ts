import { Request, Response } from "express";

import UpdateUsuarioEmpresarialService from "../services/UpdateUsuarioEmpresarialService";

import { decode } from 'jsonwebtoken';

class UpdateUsuarioEmpresarialController {
  async handle(request: Request, response: Response) {
    const {
      id,
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

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const updateUsuarioEmpresarialService = new UpdateUsuarioEmpresarialService();

    const usuarioEmpresarial = await updateUsuarioEmpresarialService.execute({
      id,
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

export default UpdateUsuarioEmpresarialController;
