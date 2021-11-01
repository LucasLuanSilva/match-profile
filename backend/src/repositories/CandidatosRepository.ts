import { EntityRepository, Repository } from 'typeorm';
import Candidato from '../entities/Candidato';

@EntityRepository(Candidato)
class CandidatosRepository extends Repository<Candidato> {

}

export default CandidatosRepository;
