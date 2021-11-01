import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import CreateCandidatoService from "../services/CreateCandidatoService";

class CreateCandidatoController {
  async handle(request: Request, response: Response) {
    const {
      vagas_id
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const createCandidatoService = new CreateCandidatoService();

    const candidato = await createCandidatoService.execute({
      vagas_id,
      usuarios_id: id
    });

    return response.json(candidato);
  }
}

export default CreateCandidatoController;
