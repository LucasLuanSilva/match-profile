import { Request, Response } from "express";
import UpdateTelefoneService from "../services/UpdateTelefoneService";

class UpdateTelefoneController {
  async handle(request: Request, response: Response) {
    const {
      id,
      ddd,
      numero,
      tipo,
      contato
    } = request.body;

    const updateTelefoneService = new UpdateTelefoneService();

    const telefone = await updateTelefoneService.execute({
      id,
      ddd,
      numero,
      tipo,
      contato
    });

    return response.json(telefone);
  }
}

export default UpdateTelefoneController;
