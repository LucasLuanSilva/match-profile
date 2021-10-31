import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRespostas1635599661026 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'respostas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'questoes_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'resposta',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'correta',
            type: 'int',
            isNullable: false,
            default: 0,
            comment: '0 - Não / 1 - Sim'
          },
          {
            name: 'pontuacao',
            type: 'int',
            isNullable: false,
            default: 0
          }
        ],
        foreignKeys: [
          {
            name: 'FK_respostas_questoes_id',
            referencedTableName: 'questoes',
            referencedColumnNames: ['id'],
            columnNames: ['questoes_id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('respostas');
  }

}
