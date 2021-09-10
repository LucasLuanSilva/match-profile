import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTelefones1631150769457 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'telefones',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'ddd',
            type: 'varchar',
            isNullable: false,
            length: '2'
          },
          {
            name: 'numero',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'tipo',
            type: 'int',
            isNullable: false
          },
          {
            name: 'contato',
            type: 'varchar'
          },
          {
            name: 'usuarios_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'usuarios_empresariais_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'usuarios_empresariais_empresas_id',
            type: 'uuid',
            isNullable: true
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
          }
        ],
        foreignKeys: [
          {
            name: 'FK_telefones_usuarios_id',
            referencedTableName: 'usuarios',
            referencedColumnNames: ['id'],
            columnNames: ['usuarios_id']
          },
          {
            name: 'FK_telefones_usuarios_empresariais_empresas_id',
            referencedTableName: 'usuarios_empresariais',
            referencedColumnNames: ['empresas_id', 'id'],
            columnNames: ['usuarios_empresariais_empresas_id', 'usuarios_empresariais_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('telefones');
  }

}
