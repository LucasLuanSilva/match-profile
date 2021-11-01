import { Request, Response } from "express";
import CreateVagaTesteService from "../services/CreateVagaTesteService";

class CreateVagaTesteController {
  async handle(request: Request, response: Response) {
    const {
      vagas_id,
      testes_id,
      testes_versao
    } = request.body;

    const createVagaTesteService = new CreateVagaTesteService();

    const vagaTeste = await createVagaTesteService.execute({
      vagas_id,
      testes_id,
      testes_versao
    });

    return response.json(vagaTeste);
  }
}

export default CreateVagaTesteController;
