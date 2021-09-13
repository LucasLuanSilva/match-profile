import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  id: string;
}

export function ensureAuthenticatedUsuarios(
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
    const { id } = verify(token, process.env.TOKEN_PASS_USUARIO) as IPayload;

    // Recuperar informações do usuário
    request.id = id;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
