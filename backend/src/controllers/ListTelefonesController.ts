import { Request, Response } from "express";
import ListTelefonesService from "../services/ListTelefonesService";

class ListTelefonesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listTelefonesService = new ListTelefonesService();

    const telefones = await listTelefonesService.execute(
      id
    );

    return response.json(telefones);
  }
}

export default ListTelefonesController;
