import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import CreateTesteAtribuidoService from "../services/CreateTesteAtribuidoService";

class CreateTesteAtribuidoController {
  async handle(request: Request, response: Response) {
    const {
      candidatos_id,
      testes_id,
      testes_versao
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id, empresas_id } = decode(token);

    const createTesteAtribuidoService = new CreateTesteAtribuidoService();

    const testeAtribuido = await createTesteAtribuidoService.execute({
      candidatos_id,
      testes_id,
      testes_versao,
      usuarios_empresariais_id: id,
      usuarios_empresariais_empresas_id: empresas_id
    });

    return response.json(testeAtribuido);
  }
}

export default CreateTesteAtribuidoController;
