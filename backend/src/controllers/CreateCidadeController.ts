import { Request, Response } from "express";
import CreateCidadeService from "../services/CreateCidadeService";

class CreateCidadeController {
  async handle(request: Request, response: Response) {
    const { codigo_municipio, nome, uf } = request.body;

    const createCidadeService = new CreateCidadeService();

    const cidade = await createCidadeService.execute({
      codigo_municipio,
      nome,
      uf
    });

    return response.json(cidade);
  }
}

export default CreateCidadeController;
