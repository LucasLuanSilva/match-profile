import { Request, Response } from "express";
import UpdateGraduacaoService from "../services/UpdateGraduacaoService";

class UpdateGraduacaoController {
  async handle(request: Request, response: Response) {
    const {
        id,
        nivel,
        nome,
        descricao,
        instituicao,
        ano_inicio,
        ano_termino,
        cursando,
        curriculos_id
    } = request.body;

    const updateGraduacaoService = new UpdateGraduacaoService();

    const graduacao = await updateGraduacaoService.execute({
        id,
        nivel,
        nome,
        descricao,
        instituicao,
        ano_inicio,
        ano_termino,
        cursando,
        curriculos_id
    });

    return response.json(graduacao);
  }
}

export default UpdateGraduacaoController;
