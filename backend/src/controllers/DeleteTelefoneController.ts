import { Request, Response } from "express";
import DeleteTelefoneService from "../services/DeleteTelefoneService";

class DeleteTelefoneController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const deleteTelefoneService = new DeleteTelefoneService();

    const telefone = await deleteTelefoneService.execute(id);

    return response.json(telefone);
  }
}

export default DeleteTelefoneController;
