import { Request, Response } from "express";
import ListCursosService from "../services/ListCursosService";

class ListCursosController {
  async handle(request: Request, response: Response) {
    const { curriculos_id } = request.params;

    const listCursosService = new ListCursosService();

    const cursos = await listCursosService.execute(
        curriculos_id
    );

    return response.json(cursos);
  }
}

export default ListCursosController;
