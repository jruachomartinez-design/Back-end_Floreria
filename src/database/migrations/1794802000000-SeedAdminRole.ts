import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdminRole1794802000000 implements MigrationInterface {
  name = 'SeedAdminRole1794802000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.roles (name) VALUES ('admin') ON CONFLICT (name) DO NOTHING`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public.roles WHERE name = 'admin' AND NOT EXISTS (SELECT 1 FROM public.users WHERE role_id = roles.id)`,
    );
  }
}
