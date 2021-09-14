import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVagas1631237959253 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vagas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
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
            name: 'situacao',
            type: 'int',
            isNullable: false,
            comment: '0 = Inativa, 1 = Ativa'
          },
          {
            name: 'data_criacao',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'data_alteracao',
            type: 'timestamp with time zone',
            isNullable: false,
            default: "now()"
          },
          {
            name: 'usuarios_empresariais_id_criou',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_empresas_id_criou',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_id_alterou',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'usuarios_empresariais_empresas_id_alterou',
            type: 'uuid',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            name: 'FK_vaga_usuarios_empresariais_empresas_id_criou',
            referencedTableName: 'usuarios_empresariais',
            referencedColumnNames: ['empresas_id', 'id'],
            columnNames: ['usuarios_empresariais_empresas_id_criou', 'usuarios_empresariais_id_criou']
          },
          {
            name: 'FK_vaga_usuarios_empresariais_empresas_id_alterou',
            referencedTableName: 'usuarios_empresariais',
            referencedColumnNames: ['empresas_id', 'id'],
            columnNames: ['usuarios_empresariais_empresas_id_alterou', 'usuarios_empresariais_id_alterou']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vagas');
  }

}
