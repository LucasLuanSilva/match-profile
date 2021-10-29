import { Request, Response } from "express";
import CreateTelefoneService from "../services/CreateTelefoneService";
import { decode } from 'jsonwebtoken';

class CreateTelefoneEmpresarialController {
  async handle(request: Request, response: Response) {
    const {
      usuarios_empresariais_id,
      ddd,
      numero,
      tipo,
      contato
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const createTelefoneService = new CreateTelefoneService();

    const telefone = await createTelefoneService.execute({
      ddd,
      numero,
      tipo,
      contato,
      usuarios_empresariais_id: usuarios_empresariais_id,
      usuarios_empresariais_empresas_id: empresas_id
    });

    return response.json(telefone);
  }
}

export default CreateTelefoneEmpresarialController;
