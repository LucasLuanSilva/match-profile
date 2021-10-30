import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTestesAtribuidos1635602577413 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'testes_atribuidos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'candidatos_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_empresas_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'testes_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'testes_versao',
            type: 'int',
            isNullable: false
          },
          {
            name: 'data',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'respondido',
            type: 'int',
            isNullable: false,
            default: 0,
            comment: '0 - Não / 1 - Sim'
          },
          {
            name: 'data_respondido',
            type: 'timestamp with time zone',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'FK_testes_atribuidos_cadidatos_id',
            referencedTableName: 'candidatos',
            referencedColumnNames: ['id'],
            columnNames: ['candidatos_id']
          },
          {
            name: 'FK_testes_atribuidos_usuarios_empresariais_empresas_id',
            referencedTableName: 'usuarios_empresariais',
            referencedColumnNames: ['empresas_id', 'id'],
            columnNames: ['usuarios_empresariais_empresas_id', 'usuarios_empresariais_id']
          },
          {
            name: 'FK_testes_atribuidos_testes_id',
            referencedTableName: 'testes',
            referencedColumnNames: ['id', 'versao'],
            columnNames: ['testes_id', 'testes_versao']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('testes_atribuidos');
  }

}
