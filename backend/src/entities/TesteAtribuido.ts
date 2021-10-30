import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Usuario from "./Usuario";
import UsuarioEmpresarial from "./UsuarioEmpresarial";
import Empresa from "./Empresa";
import Candidato from "./Candidato";
import Teste from "./Teste";

@Entity('testes_atribuidos')
class TesteAtribuido {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly candidatos_id: string;
  @JoinColumn({ name: 'candidatos_id' })
  @ManyToOne(() => Candidato)
  candidato: Candidato;

  @Column()
  readonly usuarios_empresariais_id: string;
  @JoinColumn({ name: 'usuarios_empresariais_id' })
  @ManyToOne(() => UsuarioEmpresarial)
  usuario_empresarial: UsuarioEmpresarial;

  @Column()
  readonly usuarios_empresariais_empresas_id: string;
  @JoinColumn({ name: 'usuarios_empresariais_empresas_id' })
  @ManyToOne(() => Empresa)
  empresa: Empresa;

  @Column()
  readonly testes_id: string;
  @JoinColumn({ name: 'testes_id' })
  @ManyToOne(() => Teste)

  @Column()
  readonly testes_versao: number;
  @JoinColumn({ name: 'testes_versao' })
  @ManyToOne(() => Teste)

  @CreateDateColumn()
  data: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default TesteAtribuido;
