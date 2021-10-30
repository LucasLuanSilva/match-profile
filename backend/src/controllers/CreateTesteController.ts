import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import CreateTesteService from "../services/CreateTesteService";

class CreateTesteController {
  async handle(request: Request, response: Response) {
    const {
      situacao,
      titulo,
      descricao,
      questoes
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id, empresas_id } = decode(token);

    const createTesteService = new CreateTesteService();

    const teste = await createTesteService.execute({
      situacao,
      titulo,
      descricao,
      questoes,
      usuarios_empresariais_id: id,
      usuarios_empresariais_empresas_id: empresas_id
    });

    return response.json(teste);
  }
}

export default CreateTesteController;
