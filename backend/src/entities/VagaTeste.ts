import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import Teste from "./Teste";
import Vaga from "./Vaga";

@Entity('vagas_testes')
class VagaTeste {

  @PrimaryColumn()
  readonly vagas_id: string;
  @JoinColumn({ name: 'vagas_id' })
  @ManyToOne(() => Vaga)
  vaga: Vaga;

  @PrimaryColumn()
  readonly testes_id: string;
  @JoinColumn({ name: 'testes_id' })
  @ManyToOne(() => Teste)

  @PrimaryColumn()
  readonly testes_versao: number;
  @JoinColumn({ name: 'testes_versao' })
  @ManyToOne(() => Teste)

  @Column()
  obrigatorio: number;

}

export default VagaTeste;
