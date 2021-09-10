import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExperiencias1631236746361 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'experiencias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'empresa',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'cargo',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'data_inicio',
            type: 'timestamp with time zone',
            isNullable: false
          },
          {
            name: 'data_termino',
            type: 'timestamp with time zone',
            isNullable: false
          },
          {
            name: 'curriculos_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_experiencias_curriculos_id',
            referencedTableName: 'curriculos',
            referencedColumnNames: ['id'],
            columnNames: ['curriculos_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('experiencias');
  }

}
