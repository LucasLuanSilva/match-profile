import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuariosEmpresariais1630110857021 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuarios_empresariais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'empresas_id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'sobrenome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'rg',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'senha',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'estado_civil',
            type: 'int',
            isNullable: true
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'cidades_codigo_municipio',
            type: 'varchar',
            isNullable: false
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
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: false
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
            name: 'situacao',
            type: 'int',
            isNullable: false,
            default: 1
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
            default: 0
          }
        ],
        foreignKeys: [
          {
            name: 'FK_empresas_usuarios_empresariais_id',
            referencedTableName: 'empresas',
            referencedColumnNames: ['id'],
            columnNames: ['empresas_id']
          },
          {
            name: 'FK_cidades_usuarios_empresariais_codigo_municio',
            referencedTableName: 'cidades',
            referencedColumnNames: ['codigo_municipio'],
            columnNames: ['cidades_codigo_municipio']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios_empresariais');
  }

}
