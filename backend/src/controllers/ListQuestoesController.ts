import { Request, Response } from "express";
import ListQuestoesService from "../services/ListQuestoesService";

class ListQuestoesController {
  async handle(request: Request, response: Response) {
    const { testes_id, testes_versao } = request.query;

    const listQuestoesService = new ListQuestoesService();

    const questoes = await listQuestoesService.execute({
      testes_id,
      testes_versao
    });

    return response.json(questoes);
  }
}

export default ListQuestoesController;
