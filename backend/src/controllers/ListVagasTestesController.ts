import { Request, Response } from "express";
import ListVagasTestesService from "../services/ListVagasTestesService";

class ListVagasTestesController {
  async handle(request: Request, response: Response) {
    const { vagas_id } = request.params;

    const listVagasTestesService = new ListVagasTestesService();

    const vagasTestes = await listVagasTestesService.execute(
      vagas_id
    );

    return response.json(vagasTestes);
  }
}

export default ListVagasTestesController;
