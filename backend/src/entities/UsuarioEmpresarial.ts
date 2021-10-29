import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

import Cidade from "./Cidade";
import Empresa from "./Empresa";

@Entity('usuarios_empresariais')
class UsuarioEmpresarial {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  empresas_id: string;

  @JoinColumn({ name: 'empresas_id' })
  @ManyToOne(() => Empresa)
  empresa: Empresa;

  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column()
  rg: string;

  @Exclude()
  @Column()
  senha: string;

  @Column()
  estado_civil: Number;

  @Column()
  cep: string;

  @Column()
  cidades_codigo_municipio: string;

  @JoinColumn({ name: 'cidades_codigo_municipio' })
  @ManyToOne(() => Cidade)
  cidade: Cidade;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento?: string;

  @Column()
  bairro: string;

  @CreateDateColumn()
  data_criacao: Date;

  @CreateDateColumn()
  data_alteracao: Date;

  @Column()
  situacao: Number;

  @Column()
  nivel: Number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default UsuarioEmpresarial;
