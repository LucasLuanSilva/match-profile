import { EntityRepository, Repository } from 'typeorm';

import UsuarioEmpresarial from '../entities/UsuarioEmpresarial';

@EntityRepository(UsuarioEmpresarial)
class UsuariosEmpresariaisRepository extends Repository<UsuarioEmpresarial> {

}

export default UsuariosEmpresariaisRepository;
