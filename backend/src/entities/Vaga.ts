import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Empresa from "./Empresa";
import UsuarioEmpresarial from "./UsuarioEmpresarial";

@Entity('vagas')
class Vaga {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  situacao: Number;

  @CreateDateColumn()
  data_criacao: Date;

  @CreateDateColumn()
  data_alteracao: Date;

  @Column()
  readonly usuarios_empresariais_id_criou: string;
  @JoinColumn({ name: 'usuarios_empresariais_id_criou' })
  @ManyToOne(() => UsuarioEmpresarial)
  usuario_empresarial_criou: UsuarioEmpresarial;

  @Column()
  readonly usuarios_empresariais_empresas_id_criou: string;
  @JoinColumn({ name: 'usuarios_empresariais_empresas_id_criou' })
  @ManyToOne(() => Empresa)
  empresa_criou: Empresa;

  @Column()
  readonly usuarios_empresariais_id_alterou: string;
  @JoinColumn({ name: 'usuarios_empresariais_id_alterou' })
  @ManyToOne(() => UsuarioEmpresarial)
  usuario_empresarial_alterou: UsuarioEmpresarial;

  @Column()
  readonly usuarios_empresariais_empresas_id_alterou: string;
  @JoinColumn({ name: 'usuarios_empresariais_empresas_id_alterou' })
  @ManyToOne(() => Empresa)
  empresa_alterou: Empresa;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Vaga;
