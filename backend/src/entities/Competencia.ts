import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

import Curriculo from './Curriculo';

@Entity('competencias')
class Competencia {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  descricao: string;

  @Column()
  nivel: Number;

  @Column()
  curriculos_id: string;
  @JoinColumn({ name: 'curriculos_id' })
  @ManyToOne(() => Curriculo)
  curriculo: Curriculo;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Competencia;
