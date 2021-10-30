import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Empresa from "./Empresa";
import UsuarioEmpresarial from "./UsuarioEmpresarial";
import Vaga from "./Vaga";

@Entity('testes')
class Teste {

  @PrimaryColumn()
  readonly id: string;

  @PrimaryGeneratedColumn('increment')
  readonly versao: number;

  @Column()
  situacao: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  data_criacao: Date;

  @Column()
  obrigatorio: number;

  @Column()
  readonly vagas_id: string;
  @JoinColumn({ name: 'vagas_id' })
  @ManyToOne(() => Vaga)
  vaga: Vaga;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Teste;