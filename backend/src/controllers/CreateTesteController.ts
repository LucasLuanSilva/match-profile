import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import CreateTesteService from "../services/CreateTesteService";

class CreateTesteController {
  async handle(request: Request, response: Response) {
    const {
      id,
      versao,
      situacao,
      titulo,
      descricao,
      questoes
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const usuarios_empresariais_id = decode(token).id;
    const usuarios_empresariais_empresas_id = decode(token).empresas_id;

    const createTesteService = new CreateTesteService();

    const teste = await createTesteService.execute({
      id,
      versao,
      situacao,
      titulo,
      descricao,
      questoes,
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    });

    return response.json(teste);
  }
}

export default CreateTesteController;
