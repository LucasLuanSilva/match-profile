import { EntityRepository, Repository } from 'typeorm';

import Empresa from '../entities/Empresa';

@EntityRepository(Empresa)
class EmpresasRepository extends Repository<Empresa> {

}

export default EmpresasRepository;
