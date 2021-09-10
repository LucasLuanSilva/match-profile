import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCurriculos1631230963456 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'curriculos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'usuarios_id',
            type: 'uuid'
          },
          {
            name: 'arquivo',
            type: 'varchar',
            isNullable: true
          }
        ],
        foreignKeys: [
          {
            name: 'FK_curriculos_usuarios_id',
            referencedTableName: 'usuarios',
            referencedColumnNames: ['id'],
            columnNames: ['usuarios_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('curriculos');
  }

}
