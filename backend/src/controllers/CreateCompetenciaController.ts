import { Request, Response } from "express";
import CreateCompetenciaService from '../services/CreateCompetenciasService';

class CreateCompetenciaController {
  async handle(request: Request, response: Response) {
    const {
			descricao,
            nivel,
			curriculos_id
    } = request.body;

    const createCompetenciaService = new CreateCompetenciaService();

    const competencia = await createCompetenciaService.execute({
            descricao,
            nivel,
			curriculos_id
    });

    return response.json(competencia);
  }
}

export default CreateCompetenciaController;
