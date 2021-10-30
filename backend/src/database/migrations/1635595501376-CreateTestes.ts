import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTestes1635595501376 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'testes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'versao',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'situacao',
            type: 'int',
            default: 1,
            isNullable: false,
            comment: '0 - Inativo / 1 - Ativo'
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: false
          },
          {
            name: 'data_criacao',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'obrigatorio',
            type: 'int',
            default: 0,
            isNullable: false,
            comment: '0 - Não / 1 - Sim'
          },
          {
            name: 'vagas_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_empresas_id',
            type: 'uuid',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            name: 'FK_testes_vagas_id',
            referencedTableName: 'vagas',
            referencedColumnNames: ['id'],
            columnNames: ['vagas_id']
          },
          {
            name: 'FK_testes_usuarios_empresariais_id',
            referencedTableName: 'usuarios_empresariais',
            referencedColumnNames: ['id', 'empresas_id'],
            columnNames: ['usuarios_empresariais_id', 'usuarios_empresariais_empresas_id']
          },

        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('testes');
  }

}
