import { EntityRepository, Repository } from 'typeorm';

import VagaTeste from '../entities/VagaTeste';

@EntityRepository(VagaTeste)
class VagasTestesRepository extends Repository<VagaTeste> {

}

export default VagasTestesRepository;
