import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import Curriculo from './Curriculo';

@Entity('graduacoes')
class Graduacao {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  nivel: Number;

  @Column()
  nome: string;

  @Column()
  instituicao: string;

  @Column()
  ano_inicio: string;

  @Column()
  ano_termino: string;

  @Column()
  cursando: Number;

  @Column()
  curriculos_id: string;
  @JoinColumn({ name: 'curriculos_id' })
  @ManyToOne(() => Curriculo)
  curriculo: Curriculo;
}

export default Graduacao;
