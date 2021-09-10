import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

import Curriculo from './Curriculo';

@Entity('experiencias')
class Experiencia {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  empresa: string;

  @Column()
  cargo: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  data_inicio: Date;

  @CreateDateColumn()
  data_termino: Date;

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

export default Experiencia;
