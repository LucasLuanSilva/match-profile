import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

import Curriculo from './Curriculo';

@Entity('cursos')
class Curso {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  nome: string;

  @Column()
  instituicao: string;

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

export default Curso;
