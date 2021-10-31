import { Request, Response } from "express";
import DeleteCursoService from "../services/DeleteCursoService";

class DeleteCursoController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const deleteCursoService = new DeleteCursoService();

    const curso = await deleteCursoService.execute(id);

    return response.json(curso);
  }
}

export default DeleteCursoController;
