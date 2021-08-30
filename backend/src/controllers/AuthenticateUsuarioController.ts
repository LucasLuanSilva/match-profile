import { Request, Response } from "express";
import AuthenticateUsuarioService from "../services/AuthenticateUsuarioService";


class AuthenticateUsuarioController {

  async handle(request: Request, response: Response) {
    const { cpf, email, senha } = request.body;

    const authenticateUsuarioService = new AuthenticateUsuarioService();

    const token = await authenticateUsuarioService.execute({
      cpf,
      email,
      senha
    });

    return response.json(token);
  }

}

export default AuthenticateUsuarioController;
