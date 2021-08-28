import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmpresas1629992934285 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'empresas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'razao_social',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'nome_fantasia',
            type: 'varchar'
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'cidades_codigo_municipio',
            type: 'varchar'
          },
          {
            name: 'logradouro',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'numero',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'complemento',
            type: 'varchar'
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'site',
            type: 'varchar'
          },
          {
            name: 'situacao',
            type: 'int',
            isNullable: false,
            default: 0
          },
          {
            name: 'data_criacao',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'data_alteracao',
            type: 'timestamp with time zone',
            isNullable: false,
            default: "now()"
          },
          {
            name: 'data_termino_contrato',
            type: 'timestamp with time zone',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            name: 'FK_cidades_empresas_codigo_municio',
            referencedTableName: 'cidades',
            referencedColumnNames: ['codigo_municipio'],
            columnNames: ['cidades_codigo_municipio']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('empresas');
  }

}
