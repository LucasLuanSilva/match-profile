import { Request, Response } from "express";
import BuscaInformacoesWebService from "../services/BuscaInformacoesWebService";

class BuscaInformacoesWebController {
  async handle(request: Request, response: Response) {
    const {
      candidatos_id
    } = request.params;

    const buscaInformacoesWebService = new BuscaInformacoesWebService();

    const informacoes = await buscaInformacoesWebService.execute({
      candidatos_id
    });

    return response.json(informacoes);
  }
}

export default BuscaInformacoesWebController;
