import { EntityRepository, Repository } from 'typeorm';

import Curriculo from '../entities/Curriculo';

@EntityRepository(Curriculo)
class CurriculosRepository extends Repository<Curriculo> {

}

export default CurriculosRepository;
