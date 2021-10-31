import { EntityRepository, Repository } from 'typeorm';
import Resposta from '../entities/Resposta';

@EntityRepository(Resposta)
class RespostasRepository extends Repository<Resposta> {

}

export default RespostasRepository;
