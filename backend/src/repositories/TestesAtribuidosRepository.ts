import { EntityRepository, Repository } from 'typeorm';
import TesteAtribuido from '../entities/TesteAtribuido';

@EntityRepository(TesteAtribuido)
class TestesAtribuidosRepository extends Repository<TesteAtribuido> {

}

export default TestesAtribuidosRepository;
