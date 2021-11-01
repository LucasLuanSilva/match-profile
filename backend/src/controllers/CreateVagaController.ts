import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import CreateVagaService from "../services/CreateVagaService";

class CreateVagaController {
  async handle(request: Request, response: Response) {
    const {
      titulo,
      descricao,
      testes
    } = request.body;

    const createVagaService = new CreateVagaService();

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id, empresas_id } = decode(token);

    const vaga = await createVagaService.execute({
      titulo,
      descricao,
      usuarios_empresariais_id_criou: id,
      usuarios_empresariais_empresas_id_criou: empresas_id,
      testes
    });

    return response.json(vaga);
  }
}

export default CreateVagaController;
