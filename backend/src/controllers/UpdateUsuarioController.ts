import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import UpdateUsuarioService from "../services/UpdateUsuarioService";

class UpdateUsuarioController {
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
      nivel
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const updateUsuarioService = new UpdateUsuarioService();

    const usuario = await updateUsuarioService.execute({
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
      situacao: 1
    });

    return response.json(usuario);
  }
}

export default UpdateUsuarioController;
