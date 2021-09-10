import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

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
}

export default Curriculo;
