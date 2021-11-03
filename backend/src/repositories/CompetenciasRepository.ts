import { EntityRepository, Repository } from 'typeorm';
import Competencia from '../entities/Competencia';

@EntityRepository(Competencia)
class CompetenciasRepository extends Repository<Competencia> {

}

export default CompetenciasRepository;
