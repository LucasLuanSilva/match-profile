import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCidades1629858485727 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cidades',
        columns: [
          {
            name: 'codigo_municipio',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'uf',
            type: 'varchar',
            isNullable: false
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cidades');
  }

}
