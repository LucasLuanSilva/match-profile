import { classToPlain } from "class-transformer";
import { getConnection, getCustomRepository } from "typeorm";
import CustomError from "../class/CustomError";
import TelefonesRepository from "../repositories/TelefonesRepository";
import UsuariosEmpresariaisRepository from "../repositories/UsuariosEmpresariaisRepository";

interface IUsuarioEmpresarialRequest {
  id: string,
  empresas_id: string
}

class DeleteUsuarioEmpresarialService {
  async execute({ id, empresas_id }: IUsuarioEmpresarialRequest) {
    const usuariosEmpresariaisRepository = getCustomRepository(UsuariosEmpresariaisRepository);
    const telefonesRepository = getCustomRepository(TelefonesRepository);

    const usuario = await usuariosEmpresariaisRepository.findOne({ id, empresas_id });

    if (!usuario) {
      throw new CustomError(400, 'Usuário não encontrado!');
    }

    if (!id || !empresas_id) {
      throw new CustomError(400, 'Informe o usuário que deseja excluir!');
    }

    const telefone = await telefonesRepository.delete({
      usuarios_empresariais_id: id,
      usuarios_empresariais_empresas_id: empresas_id
    });

    await usuariosEmpresariaisRepository.delete({ id, empresas_id });

    return classToPlain(usuario);
  }
}

export default DeleteUsuarioEmpresarialService;
