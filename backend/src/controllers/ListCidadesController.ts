import { Request, Response } from "express";
import ListCidadesService from "../services/ListCidadesService";

class ListCidadesController {
  async handle(request: Request, response: Response) {
    const { uf } = request.params;

    const listCidadesService = new ListCidadesService();

    const cidades = await listCidadesService.execute(uf ? String(uf).toUpperCase() : undefined);

    return response.json(cidades);
  }
}

export default ListCidadesController;
