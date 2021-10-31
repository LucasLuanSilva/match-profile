import { Request, Response } from "express";
import UpdateCursoService from "../services/UpdateCursoService";

class UpdateCursoController {
  async handle(request: Request, response: Response) {
    const {
        id,
        nome,
        instituicao,
        data_inicio,
        data_termino,
        curriculos_id
    } = request.body;

    const updateCursoService = new UpdateCursoService();

    const curso = await updateCursoService.execute({
        id,
        nome,
        instituicao,
        data_inicio,
        data_termino,
        curriculos_id
    });

    return response.json(curso);
  }
}

export default UpdateCursoController;
