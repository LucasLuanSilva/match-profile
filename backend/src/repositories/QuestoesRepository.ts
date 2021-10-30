import { EntityRepository, Repository } from 'typeorm';
import Questao from '../entities/Questao';

@EntityRepository(Questao)
class QuestoesRepository extends Repository<Questao> {

}

export default QuestoesRepository;
