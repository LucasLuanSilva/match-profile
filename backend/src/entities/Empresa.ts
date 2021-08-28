import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import Cidade from "./Cidade";

@Entity('empresas')
class Empresa {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  cnpj: string;

  @Column()
  razao_social: string;

  @Column()
  nome_fantasia: string;

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
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  site: string;

  @Column()
  situacao: Number;

  @CreateDateColumn()
  data_criacao: Date;

  @CreateDateColumn()
  data_alteracao: Date;

  @CreateDateColumn()
  data_termino_contrato: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Empresa;
