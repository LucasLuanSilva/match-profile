import { EntityRepository, Repository } from 'typeorm';

import Telefone from '../entities/Telefone';

@EntityRepository(Telefone)
class TelefoneRepository extends Repository<Telefone> {

}

export default TelefoneRepository;
