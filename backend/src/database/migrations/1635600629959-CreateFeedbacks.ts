import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFeedbacks1635600629959 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedbacks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'nota',
            type: 'int',
            isNullable: false,
            comment: '0 a 5'
          },
          {
            name: 'motivo',
            type: 'text',
            isNullable: true
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
            name: 'data',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_feedbacks_usuarios_id',
            referencedTableName: 'usuarios',
            referencedColumnNames: ['id'],
            columnNames: ['usuarios_id']
          },
          {
            name: 'FK_feedbacks_usuarios_empresariais_empresas_id',
            referencedTableName: 'usuarios_empresariais',
            referencedColumnNames: ['empresas_id', 'id'],
            columnNames: ['usuarios_empresariais_empresas_id', 'usuarios_empresariais_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedbacks');
  }

}
