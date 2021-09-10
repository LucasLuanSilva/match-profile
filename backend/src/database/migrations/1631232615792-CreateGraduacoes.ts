import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGraduacoes1631232615792 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'graduacoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
            comment: '0 = Fundamental, 1 = Médio, 2 = Superior, 3 = Pós-graduação, 4 = Mestrado, 5 = Doutorado'
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
            name: 'ano_inicio',
            type: 'varchar',
            length: '4',
            isNullable: false
          },
          {
            name: 'ano_termino',
            type: 'varchar',
            length: '4',
            isNullable: false
          },
          {
            name: 'cursando',
            type: 'int',
            isNullable: false,
            comment: '0 = Não cursando, 1 = Cursando'
          },
          {
            name: 'curriculos_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_graduacoes_curriculos_id',
            referencedTableName: 'graduacoes',
            referencedColumnNames: ['id'],
            columnNames: ['curriculos_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('graduacoes');
  }

}
