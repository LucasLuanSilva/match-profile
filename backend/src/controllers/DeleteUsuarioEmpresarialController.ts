import { Request, Response } from "express";

import DeleteUsuarioEmpresarialService from "../services/DeleteUsuarioEmpresarialService";

import { decode } from 'jsonwebtoken';

class DeleteUsuarioEmpresarialController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const deleteUsuarioEmpresarialService = new DeleteUsuarioEmpresarialService();

    const usuarioEmpresarial = await deleteUsuarioEmpresarialService.execute({
      id,
      empresas_id
    });

    return response.json(usuarioEmpresarial);
  }
}

export default DeleteUsuarioEmpresarialController;
