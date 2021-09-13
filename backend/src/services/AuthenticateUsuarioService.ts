import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import CustomError from "../class/CustomError";
import UsuariosRepository from "../repositories/UsuariosRepository";

interface IAuthenticateRequest {
  cpf?: string;
  email?: string;
  senha: string;
}

class AuthenticateUsuarioService {

  async execute({
    cpf,
    email,
    senha
  }: IAuthenticateRequest) {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuarioExisteCPF = await usuariosRepository.findOne({ cpf });

    const usuarioExisteEmail = await usuariosRepository.findOne({ email });

    let usuario = undefined;
    if (usuarioExisteCPF) {
      usuario = usuarioExisteCPF;
    }

    if (usuarioExisteEmail) {
      usuario = usuarioExisteEmail;
    }

    if (!usuario) {
      throw new CustomError(401, "Usuário ou senha incorreta!");
    }

    const passwordMatch = await compare(senha, usuario.senha);

    if (!passwordMatch) {
      throw new CustomError(401, "Usuário ou senha incorreta!");
    }

    //Gerar Token
    const token = sign({
      id: usuario.id
    }, process.env.TOKEN_PASS_USUARIO, {
      subject: usuario.id,
      expiresIn: '12h'
    });

    return token;
  }
}

export default AuthenticateUsuarioService;
