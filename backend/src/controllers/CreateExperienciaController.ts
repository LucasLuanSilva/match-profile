import { Request, Response } from "express";
import CreateExperienciaService from '../services/CreateExperienciaService';

class CreateExperienciaController {
  async handle(request: Request, response: Response) {
    const {
      empresa,
			cargo,
      descricao,
			data_inicio,
			data_termino,
			curriculos_id
    } = request.body;

    const createExperienciaService = new CreateExperienciaService();

    const experiencia = await createExperienciaService.execute({
            empresa,
            cargo,
            descricao,
            data_inicio,
            data_termino,
            curriculos_id
    });

    return response.json(experiencia);
  }
}

export default CreateExperienciaController;
