import { Request, Response } from "express";
import DeleteGraduacaoService from "../services/DeleteGraduacaoService";

class DeleteGraduacaoController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const deleteGraduacaoService = new DeleteGraduacaoService();

    const graduacao = await deleteGraduacaoService.execute(id);

    return response.json(graduacao);
  }
}

export default DeleteGraduacaoController;
