import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListTelefonesService from "../services/ListTelefonesService";

class ListTelefonesController {
  async handle(request: Request, response: Response) {
    // const { id } = request.params;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);


    const listTelefonesService = new ListTelefonesService();

    const telefones = await listTelefonesService.execute(
      id
    );

    return response.json(telefones);
  }
}

export default ListTelefonesController;
