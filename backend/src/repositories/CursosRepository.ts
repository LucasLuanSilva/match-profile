import { EntityRepository, Repository } from 'typeorm';

import Curso from '../entities/Curso';

@EntityRepository(Curso)
class CursosRepository extends Repository<Curso> {

}

export default CursosRepository;
