import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCustomerRole1794801000000 implements MigrationInterface {
  name = 'SeedCustomerRole1794801000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.roles (name) VALUES ('customer') ON CONFLICT (name) DO NOTHING`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public.roles WHERE name = 'customer' AND NOT EXISTS (SELECT 1 FROM public.users WHERE role_id = roles.id)`,
    );
  }
}
