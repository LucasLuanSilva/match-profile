import { EntityRepository, Repository } from 'typeorm';

import Cidade from '../entities/Cidade';

@EntityRepository(Cidade)
class CidadesRepository extends Repository<Cidade> {

}

export default CidadesRepository;
