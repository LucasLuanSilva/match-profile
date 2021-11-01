import { EntityRepository, Repository } from 'typeorm';

import Graduacao from '../entities/Graduacao';

@EntityRepository(Graduacao)
class GraduacaoRepository extends Repository<Graduacao> {

}

export default GraduacaoRepository;
