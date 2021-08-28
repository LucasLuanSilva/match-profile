import { Request, Response } from "express";
import AuthenticateUsuarioEmpresarialService from "../services/AuthenticateUsuarioEmpresarialService";


class AuthenticateUsuarioEmpresarialController {

  async handle(request: Request, response: Response) {
    const { cpf, email, senha } = request.body;

    const authenticateUsuarioEmpresarialService = new AuthenticateUsuarioEmpresarialService();

    const token = await authenticateUsuarioEmpresarialService.execute({
      cpf,
      email,
      senha
    });

    return response.json(token);
  }

}

export default AuthenticateUsuarioEmpresarialController;
