import { Request, Response } from "express";
import CreateCurriculoService from '../services/CreateCurriculoService';
import { decode } from "jsonwebtoken";

class CreateCurriculoController {
  async handle(request: Request, response: Response) {
    const {
      arquivo
    } = request.body;

		const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    const { id } = decode(token);

    const createCurriculoService = new CreateCurriculoService();

    const curriculo = await createCurriculoService.execute({
      arquivo,
      usuarios_id:id
    });

    return response.json(curriculo);
  }
}

export default CreateCurriculoController;
