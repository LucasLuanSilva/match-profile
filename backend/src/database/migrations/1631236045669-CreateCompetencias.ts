import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompetencias1631236045669 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'competencias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
            comment: '0 = Basico, 1 = Intermediário, 2 = Avançado'
          },
          {
            name: 'curriculos_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_competencias_curriculos_id',
            referencedTableName: 'curriculos',
            referencedColumnNames: ['id'],
            columnNames: ['curriculos_id']
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('competencias');
  }

}
