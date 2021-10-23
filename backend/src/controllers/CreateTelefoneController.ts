import { Request, Response } from "express";
import CreateTelefoneService from "../services/CreateTelefoneService";

class CreateTelefoneController {
  async handle(request: Request, response: Response) {
    const {
      ddd,
      numero,
      tipo,
      contato,
      usuarios_id,
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    } = request.body;

    const createTelefoneService = new CreateTelefoneService();

    const telefone = await createTelefoneService.execute({
      ddd,
      numero,
      tipo,
      contato,
      usuarios_id,
      usuarios_empresariais_id,
      usuarios_empresariais_empresas_id
    });

    return response.json(telefone);
  }
}

export default CreateTelefoneController;
