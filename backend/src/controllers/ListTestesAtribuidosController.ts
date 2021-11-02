import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListTestesAtribuidosService from "../services/ListTestesAtribuidosService";

class ListTestesAtribuidosController {
  async handle(request: Request, response: Response) {
    const listTestesAtribuidosService = new ListTestesAtribuidosService();

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const testes = await listTestesAtribuidosService.execute({
      usuarios_id: id
    });

    return response.json(testes);
  }
}

export default ListTestesAtribuidosController;
