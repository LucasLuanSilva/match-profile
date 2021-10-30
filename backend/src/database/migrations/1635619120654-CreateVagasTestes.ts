import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVagasTestes1635619120654 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vagas_testes',
        columns: [
          {
            name: 'vagas_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'testes_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'testes_versao',
            type: 'int',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'obrigatorio',
            type: 'int',
            default: 0,
            isNullable: false,
            comment: '0 - Não / 1 - Sim'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_vagas_testes_vagas_id',
            referencedTableName: 'vagas',
            referencedColumnNames: ['id'],
            columnNames: ['vagas_id']
          },
          {
            name: 'FK_vagas_testes_testes_id',
            referencedTableName: 'testes',
            referencedColumnNames: ['id', 'versao'],
            columnNames: ['testes_id', 'testes_versao']
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vagas_testes');
  }

}
