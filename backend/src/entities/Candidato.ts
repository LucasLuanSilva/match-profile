import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Usuario from "./Usuario";
import Vaga from "./Vaga";

@Entity('candidatos')
class Candidato {

  @PrimaryColumn()
  readonly id: string;

  @CreateDateColumn()
  data: Date;

  @Column()
  readonly usuarios_id: string;
  @JoinColumn({ name: 'usuarios_id' })
  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @Column()
  readonly vagas_id: string;
  @JoinColumn({ name: 'vagas_id' })
  @ManyToOne(() => Vaga)
  vaga: Vaga;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Candidato;
