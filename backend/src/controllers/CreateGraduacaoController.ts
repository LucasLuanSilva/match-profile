import { Request, Response } from "express";
import CreateGraduacaoService from '../services/CreateGraduacaoService';

class CreateGraduacaoController {
  async handle(request: Request, response: Response) {
    const {
        nivel,
        nome,
        descricao,
        instituicao,
        ano_inicio,
        ano_termino,
        cursando,
        curriculos_id
    } = request.body;

    const createGraduacaoService = new CreateGraduacaoService();

    const graduacao = await createGraduacaoService.execute({
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

export default CreateGraduacaoController;
