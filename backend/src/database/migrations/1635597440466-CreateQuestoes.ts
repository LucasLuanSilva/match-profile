import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuestoes1635597440466 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'pergunta',
            type: 'text',
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
            name: 'data_criacao',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          },
        ],
        foreignKeys: [
          {
            name: 'FK_questoes_testes_id',
            referencedTableName: 'testes',
            referencedColumnNames: ['id', 'versao'],
            columnNames: ['testes_id', 'testes_versao']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questoes');
  }

}
