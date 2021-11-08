import { Request, Response } from "express";
import CreateRespostaPreenchidaService from '../services/CreateRespostaPreenchidaService';

class CreateRespostaPreenchidaController {
  async handle(request: Request, response: Response) {
    const { testes_atribuidos_id, respostas } = request.body;

    const createRespostaPreenchidaService = new CreateRespostaPreenchidaService();

    const respostaPreenchida = await createRespostaPreenchidaService.execute({
      testes_atribuidos_id,
      respostas
    });

    return response.json(respostaPreenchida);
  }
}

export default CreateRespostaPreenchidaController;
