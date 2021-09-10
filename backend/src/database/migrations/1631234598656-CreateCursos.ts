import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCursos1631234598656 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cursos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'instituicao',
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
            name: 'FK_cursos_curriculos_id',
            referencedTableName: 'curriculos',
            referencedColumnNames: ['id'],
            columnNames: ['curriculos_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cursos');
  }

}
