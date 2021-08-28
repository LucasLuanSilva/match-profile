import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  id: string;
  empresas_id: string;
}

export function ensureAuthenticatedEmpresariais(
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
    const { id, empresas_id } = verify(token, "senhaDesenvolvimento") as IPayload;

    // Recuperar informações do usuário
    request.id = id;
    request.empresas_id = empresas_id;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
