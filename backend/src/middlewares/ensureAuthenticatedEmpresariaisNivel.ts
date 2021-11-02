import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

interface IPayload {
  id: string;
  empresas_id: string;
}

export async function ensureAuthenticatedEmpresariaisNivel(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar se o token é válido
    const { id, empresas_id } = verify(token, process.env.TOKEN_PASS_EMPRESARIAL) as IPayload;

    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);

    const { nivel } = await usuariosEmpresariaisRepository.findOne({
      id,
      empresas_id
    });

    if (nivel == 1) {
      return next();
    } else {
      return response.status(401).end();
    }
  } catch (err) {
    return response.status(401).end();
  }
}
