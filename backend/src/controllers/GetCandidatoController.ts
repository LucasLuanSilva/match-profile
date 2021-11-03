import { Request, Response } from "express";
import GetCandidatoService from "../services/GetCandidatoService";

class GetCandidatoController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getCandidatoService = new GetCandidatoService();

    const candidato = await getCandidatoService.execute({ id });

    return response.json(candidato);
  }
}

export default GetCandidatoController;
