import { Request, Response } from "express";
import UpdateExperienciaService from "../services/UpdateExperienciaService";

class UpdateExperienciaController {
  async handle(request: Request, response: Response) {
    const {
        id,
        empresa,
        cargo,
        descricao,
        data_inicio,
        data_termino,
        curriculos_id
    } = request.body;

    const updateExperienciaService = new UpdateExperienciaService();

    const experiencia = await updateExperienciaService.execute({
        id,
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

export default UpdateExperienciaController;
