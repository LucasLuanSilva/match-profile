import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListVagasService from "../services/ListVagasService";

class ListVagasController {
  async handle(request: Request, response: Response) {
    const listVagasService = new ListVagasService();

    const vagas = await listVagasService.execute({
    });

    return response.json(vagas);
  }
}

export default ListVagasController;
