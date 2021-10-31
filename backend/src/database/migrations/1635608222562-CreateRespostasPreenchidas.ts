import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRespostasPreenchidas1635608222562 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'respostas_preenchidas',
        columns: [
          {
            name: 'questoes_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'respostas_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'testes_atribuidos_id',
            type: 'uuid',
            isNullable: false
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
            name: 'FK_respostas_preenchidas_questoes_id',
            referencedTableName: 'questoes',
            referencedColumnNames: ['id'],
            columnNames: ['questoes_id']
          },
          {
            name: 'FK_respostas_preenchidas_respostas_id',
            referencedTableName: 'respostas',
            referencedColumnNames: ['id'],
            columnNames: ['respostas_id']
          },
          {
            name: 'FK_respostas_preenchidas_testes_atribuidos_id',
            referencedTableName: 'testes_atribuidos',
            referencedColumnNames: ['id'],
            columnNames: ['testes_atribuidos_id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('respostas_preenchidas');
  }

}
