import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListUsuariosEmpresariaisService from "../services/ListUsuariosEmpresariaisService";

class ListUsuariosEmpresariaisController {
  async handle(request: Request, response: Response) {
    const idBusca = request.params.id;

    const { logado } = request.query;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const listUsuariosEmpresariaisService = new ListUsuariosEmpresariaisService();

    const usuario = await listUsuariosEmpresariaisService.execute(
      id,
      logado == 'true' ? id : idBusca
    );

    return response.json(usuario);
  }
}

export default ListUsuariosEmpresariaisController
