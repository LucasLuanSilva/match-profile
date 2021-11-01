import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import DeleteVagaService from "../services/DeleteVagaService";

class DeleteVagaController {
  async handle(request: Request, response: Response) {
    const {
      id
    } = request.params;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const deleteVagaService = new DeleteVagaService();

    const vaga = await deleteVagaService.execute({
      id,
      usuarios_empresariais_empresas_id_criou: empresas_id
    });

    return response.json(vaga);
  }
}

export default DeleteVagaController;
