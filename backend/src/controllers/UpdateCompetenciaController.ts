import { Request, Response } from "express";
import UpdateCompetenciaService from "../services/UpdateCompetenciaService";

class UpdateCompetenciaController {
  async handle(request: Request, response: Response) {
    const {
        id,
        nivel,
        descricao,
        curriculos_id
    } = request.body;

    const updateCompetenciaService = new UpdateCompetenciaService();

    const competencia = await updateCompetenciaService.execute({
        id,
        nivel,
        descricao,
        curriculos_id
    });

    return response.json(competencia);
  }
}

export default UpdateCompetenciaController;
