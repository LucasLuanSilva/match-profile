import { Request, Response } from "express";
import ListUsuariosEmpresariaisService from "../services/ListUsuariosEmpresariaisService";

class ListUsuariosEmpresariaisController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listUsuariosEmpresariaisService = new ListUsuariosEmpresariaisService();

    const usuario = await listUsuariosEmpresariaisService.execute(id);

    return response.json(usuario);
  }
}

export default ListUsuariosEmpresariaisController
