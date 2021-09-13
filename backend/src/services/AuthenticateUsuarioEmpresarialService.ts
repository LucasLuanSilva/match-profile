import { getCustomRepository, useContainer } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import CustomError from "../class/CustomError";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";
import UsuarioEmpresarial from "../entities/UsuarioEmpresarial";

interface IAuthenticateRequest {
  cpf?: string;
  email?: string;
  senha: string;
}

class AuthenticateUsuarioEmpresarialService {

  async execute({
    cpf,
    email,
    senha
  }: IAuthenticateRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);

    const usuarioExisteCPF = await usuariosEmpresariaisRepository.findOne({ cpf });

    const usuarioExisteEmail = await usuariosEmpresariaisRepository.findOne({ email });

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
      id: usuario.id,
      empresas_id: usuario.empresas_id
    }, process.env.TOKEN_PASS_EMPRESARIAL, {
      subject: usuario.id,
      expiresIn: '12h'
    });

    return token;
  }
}

export default AuthenticateUsuarioEmpresarialService;
