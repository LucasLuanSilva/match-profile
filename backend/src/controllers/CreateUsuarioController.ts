import { Request, Response } from "express";

import CreateUsuarioService from "../services/CreateUsuarioService";

class CreateUsuarioController {
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
      situacao
    } = request.body;

    const createUsuarioService = new CreateUsuarioService();

    const usuario = await createUsuarioService.execute({
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
      situacao
    });

    return response.json(usuario);
  }
}

export default CreateUsuarioController;