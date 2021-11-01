import { Request, Response } from "express";
import ListGraduacaoService from "../services/ListGraduacaoService";

class ListGraduacaoController {
  async handle(request: Request, response: Response) {
    const { curriculos_id } = request.params;

    const listGraduacaoService = new ListGraduacaoService();

    const graduacao = await listGraduacaoService.execute(
        curriculos_id
    );

    return response.json(graduacao);
  }
}

export default ListGraduacaoController;
