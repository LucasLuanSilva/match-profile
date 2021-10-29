import { EntityRepository, Repository } from 'typeorm';

import Telefone from '../entities/Telefone';

@EntityRepository(Telefone)
class TelefonesRepository extends Repository<Telefone> {

}

export default TelefonesRepository;
