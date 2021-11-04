import { Request, Response } from "express";
import ListCompetenciasService from "../services/ListCompetenciasService";

class ListCompetenciasController {
  async handle(request: Request, response: Response) {
    const { curriculos_id } = request.params;

    const listCompetenciasService = new ListCompetenciasService();

    const competencias = await listCompetenciasService.execute(
        curriculos_id
    );

    return response.json(competencias);
  }
}

export default ListCompetenciasController;
