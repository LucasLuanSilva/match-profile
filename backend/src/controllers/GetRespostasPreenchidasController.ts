import { Request, Response } from "express";
import GetRespostasPreenchidasService from "../services/GetRespostasPreenchidasService";

class GetRespostasPreenchidasController {
  async handle(request: Request, response: Response) {
    const {
      testes_atribuidos_id,
      testes_id,
      testes_versao
    } = request.query;

    const getRespostasPreenchidasService = new GetRespostasPreenchidasService();

    const respostas = await getRespostasPreenchidasService.execute({
      testes_atribuidos_id,
      testes_id,
      testes_versao
    });

    return response.json(respostas);
  }
}

export default GetRespostasPreenchidasController;
