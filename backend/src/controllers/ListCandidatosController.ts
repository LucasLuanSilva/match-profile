import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListCandidatosService from "../services/ListCandidatosService";

class ListCandidatosController {
  async handle(request: Request, response: Response) {
    const listCandidatosService = new ListCandidatosService();

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const candidatos = await listCandidatosService.execute({
      usuarios_empresariais_empresas_id_criou: empresas_id
    });

    return response.json(candidatos);
  }
}

export default ListCandidatosController;
