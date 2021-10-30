import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import ListTestesEmpresariaisService from "../services/ListTestesEmpresariaisService";

class ListTestesEmpresariaisController {
  async handle(request: Request, response: Response) {
    const listTestesEmpresariaisService = new ListTestesEmpresariaisService();

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id, empresas_id } = decode(token);

    const testes = await listTestesEmpresariaisService.execute({
      usuarios_empresariais_id: id,
      usuarios_empresariais_empresas_id: empresas_id
    });

    return response.json(testes);
  }
}

export default ListTestesEmpresariaisController;
