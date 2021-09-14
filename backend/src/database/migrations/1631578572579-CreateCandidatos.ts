import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCandidatos1631578572579 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidatos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'data',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'usuarios_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'vagas_id',
            type: 'uuid',
            isNullable: false
          },
        ],
        foreignKeys: [
          {
            name: 'FK_candidatos_usuarios_id',
            referencedTableName: 'usuarios',
            referencedColumnNames: ['id'],
            columnNames: ['usuarios_id']
          },
          {
            name: 'FK_candidatos_vagas_id',
            referencedTableName: 'vagas',
            referencedColumnNames: ['id'],
            columnNames: ['vagas_id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candidatos');
  }

}
