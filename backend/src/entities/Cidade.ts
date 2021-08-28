import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cidades')
class Cidade {
  @PrimaryColumn('varchar')
  readonly codigo_municipio: string;

  @Column()
  nome: string;

  @Column()
  uf: string;
}

export default Cidade;
