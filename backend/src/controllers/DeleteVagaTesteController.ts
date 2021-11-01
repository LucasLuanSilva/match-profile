import { Request, Response } from "express";
import DeleteGraduacaoService from "../services/DeleteGraduacaoService";
import DeleteVagaTesteService from "../services/DeleteVagaTesteService";

class DeleteVagaTesteController {
  async handle(request: Request, response: Response) {
    const {
      vagas_id,
      testes_id,
      testes_versao
    } = request.params;

    const deleteVagaTesteService = new DeleteVagaTesteService();

    const vagaTeste = await deleteVagaTesteService.execute({
      vagas_id,
      testes_id,
      testes_versao
    });

    return response.json(vagaTeste);
  }
}

export default DeleteVagaTesteController;
