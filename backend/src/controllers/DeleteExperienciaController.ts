import { Request, Response } from "express";
import DeleteExperienciaService from "../services/DeleteExperienciaService";

class DeleteExperienciaController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const deleteExperienciaService = new DeleteExperienciaService();

    const experiencia = await deleteExperienciaService.execute(id);

    return response.json(experiencia);
  }
}

export default DeleteExperienciaController;
