import { Request, Response } from "express";
import CreateRespostaPreenchidaService from '../services/CreateRespostaPreenchidaService';

class CreateRespostaPreenchidaController {
  async handle(request: Request, response: Response) {
    const respostas = request.body;

    const createRespostaPreenchidaService = new CreateRespostaPreenchidaService();

    const respostaPreenchida = await createRespostaPreenchidaService.execute({
        respostas
    });

    return response.json(respostaPreenchida);
  }
}

export default CreateRespostaPreenchidaController;
