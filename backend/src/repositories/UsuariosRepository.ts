import { EntityRepository, Repository } from 'typeorm';

import Usuario from '../entities/Usuario';

@EntityRepository(Usuario)
class UsuariosRepository extends Repository<Usuario> {

}

export default UsuariosRepository;
