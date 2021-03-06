import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Teste from "./Teste";

@Entity('questoes')
class Questao {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  pergunta: string;

  @Column()
  tipo: number;

  @Column()
  readonly testes_id: string;
  @Column()
  readonly testes_versao: number;
  @JoinColumn([
    { name: 'testes_id' },
    { name: 'testes_versao' }
  ])
  @ManyToOne(() => Teste)
  teste: Teste;

  @CreateDateColumn()
  data_criacao: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Questao;
