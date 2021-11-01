import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';
import UpdateVagaService from "../services/UpdateVagaService";

class UpdateVagaController {
  async handle(request: Request, response: Response) {
    const {
      id,
      titulo,
      descricao,
    } = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const updateVagaService = new UpdateVagaService();

    const vaga = await updateVagaService.execute({
      id,
      titulo,
      descricao,
      usuarios_empresariais_id_alterou: decode(token).id,
      usuarios_empresariais_empresas_id_alterou: decode(token).empresas_id
    });

    return response.json(vaga);
  }
}

export default UpdateVagaController;
