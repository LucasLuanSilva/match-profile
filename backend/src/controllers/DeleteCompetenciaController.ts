import { Request, Response } from "express";
import DeleteCompetenciaService from "../services/DeleteCompetenciaService";

class DeleteCompetenciaController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const deleteCompetenciaService = new DeleteCompetenciaService();

    const competencia = await deleteCompetenciaService.execute(id);

    return response.json(competencia);
  }
}

export default DeleteCompetenciaController;
