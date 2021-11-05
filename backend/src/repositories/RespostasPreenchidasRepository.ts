import { EntityRepository, Repository } from 'typeorm';
import RespostaPreenchida from '../entities/RespostaPreenchida';

@EntityRepository(RespostaPreenchida)
class RespostasPreenchidasRepository extends Repository<RespostaPreenchida> {

}

export default RespostasPreenchidasRepository;
