import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Questao from "./Questao";
import Resposta from "./Resposta";
import TesteAtribuido from "./TesteAtribuido";

@Entity('respostas_preenchidas')
class RespostaPreenchida {

  @Column()
  readonly questoes_id: string;
  @JoinColumn({ name: 'questoes_id' })
  @ManyToOne(() => Questao)
  questao: Questao

  @PrimaryColumn()
  readonly respostas_id: string;
  @JoinColumn({ name: 'respostas_id' })
  @ManyToOne(() => Resposta)
  resposta: Resposta

  @Column()
  readonly testes_atribuidos_id: string;
  @JoinColumn({ name: 'testes_atribuidos_id' })
  @ManyToOne(() => TesteAtribuido)
  testeAtribuido: TesteAtribuido

  @Column()
  nivel: number;

}

export default RespostaPreenchida;
