import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Questao from "./Questao";

@Entity('respostas')
class Resposta {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly questoes_id: string;
  @JoinColumn({ name: 'questoes_id' })
  @ManyToOne(() => Questao)
  questao: Questao

  @Column()
  resposta: string;

  @Column()
  correta: number;

  @Column()
  pontuacao: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Resposta;
