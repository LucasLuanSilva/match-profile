import { Request, Response } from "express";
import CreateCursoService from '../services/CreateCursoService';

class CreateCurriculoController {
  async handle(request: Request, response: Response) {
    const {
			nome,
			instituicao,
			data_inicio,
			data_termino,
			curriculos_id
    } = request.body;

    const createCursoService = new CreateCursoService();

    const curriculo = await createCursoService.execute({
			nome,
			instituicao,
			data_inicio,
			data_termino,
			curriculos_id
    });

    return response.json(curriculo);
  }
}

export default CreateCurriculoController;
