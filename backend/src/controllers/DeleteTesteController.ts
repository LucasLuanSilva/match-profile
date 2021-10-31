import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import DeleteTesteService from "../services/DeleteTesteService";

class DeleteTesteController {
  async handle(request: Request, response: Response) {
    const {
      id,
      versao
    } = request.params;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const deleteTesteService = new DeleteTesteService();

    const teste = await deleteTesteService.execute({ id, versao, empresas_id });

    return response.json(teste);
  }
}

export default DeleteTesteController;
