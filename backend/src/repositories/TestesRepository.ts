import { EntityRepository, Repository } from 'typeorm';
import Teste from '../entities/Teste';

@EntityRepository(Teste)
class TestesRepository extends Repository<Teste> {

}

export default TestesRepository;
