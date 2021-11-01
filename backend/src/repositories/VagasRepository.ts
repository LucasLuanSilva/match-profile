import { EntityRepository, Repository } from 'typeorm';

import Vaga from '../entities/Vaga';

@EntityRepository(Vaga)
class VagasRepository extends Repository<Vaga> {

}

export default VagasRepository;
