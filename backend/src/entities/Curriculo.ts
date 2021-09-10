import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

import Usuario from './Usuario';

@Entity('curriculos')
class Curriculo {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  usuarios_id: string;

  @JoinColumn({ name: 'usuarios_id' })
  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @Column()
  arquivo: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Curriculo;
