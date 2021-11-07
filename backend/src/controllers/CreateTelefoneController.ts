import { Request, Response } from "express";
import CreateTelefoneService from "../services/CreateTelefoneService";
import { decode } from 'jsonwebtoken';

class CreateTelefoneController {
  async handle(request: Request, response: Response) {
    const {
      ddd,
      numero,
      tipo,
      contato
    } = request.body;

    const createTelefoneService = new CreateTelefoneService();

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const telefone = await createTelefoneService.execute({
      ddd,
      numero,
      tipo,
      contato,
      usuarios_id: id
    });

    return response.json(telefone);
  }
}

export default CreateTelefoneController;
