import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListVagasEmpresariaisService from "../services/ListVagasEmpresariaisService";

class ListVagasEmpresariaisController {
  async handle(request: Request, response: Response) {
    const listVagasEmpresariaisService = new ListVagasEmpresariaisService();

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { empresas_id } = decode(token);

    const vagas = await listVagasEmpresariaisService.execute({
      usuarios_empresariais_empresas_id_criou: empresas_id
    });

    return response.json(vagas);
  }
}

export default ListVagasEmpresariaisController;
