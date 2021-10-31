import { EntityRepository, Repository } from 'typeorm';

import Experiencia from '../entities/Experiencia';

@EntityRepository(Experiencia)
class ExperienciasRepository extends Repository<Experiencia> {

}

export default ExperienciasRepository;
