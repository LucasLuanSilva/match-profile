import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListUsuariosService from "../services/ListUsuariosService";

class ListUsuariosController {
  async handle(request: Request, response: Response) {
    

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const listUsuariosService = new ListUsuariosService();

    const usuario = await listUsuariosService.execute(
      id
    );

    return response.json(usuario);
  }
}

export default ListUsuariosController
