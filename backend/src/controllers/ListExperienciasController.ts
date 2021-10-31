import { Request, Response } from "express";
import ListExperienciasService from "../services/ListExperienciasService";

class ListExperienciasController {
  async handle(request: Request, response: Response) {
    const { curriculos_id } = request.params;

    const listExperienciasService = new ListExperienciasService();

    const experiencias = await listExperienciasService.execute(
        curriculos_id
    );

    return response.json(experiencias);
  }
}

export default ListExperienciasController;
