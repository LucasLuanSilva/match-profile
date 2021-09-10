import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Usuario from "./Usuario";
import UsuarioEmpresarial from "./UsuarioEmpresarial";
import Empresa from "./Empresa";

@Entity('telefones')
class Telefone {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  ddd: string;

  @Column()
  numero: string;

  @Column()
  tipo: Number;

  @Column()
  contato: string;

  @Column()
  readonly usuarios_id: string;
  @JoinColumn({ name: 'usuarios_id' })
  @ManyToOne(() => Usuario)
  usuario: Usuario;

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

  @CreateDateColumn()
  data_criacao: Date;

  @CreateDateColumn()
  data_alteracao: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Telefone;
