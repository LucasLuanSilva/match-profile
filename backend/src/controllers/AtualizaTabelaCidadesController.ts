import { Request, Response } from "express";
import AtualizaTabelaCidadesService from "../services/AtualizaTabelaCidadesService";

class AtualizaTabelaCidadesController {
  async handle(request: Request, response: Response) {

    const atualizaTabelaCidadesService = new AtualizaTabelaCidadesService();

    const cidades = await atualizaTabelaCidadesService.execute();

    return response.json(cidades);
  }
}

export default AtualizaTabelaCidadesController;
