import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { PostgresDataSourceOptions } from 'typeorm/driver/postgres/PostgresDataSourceOptions';

export function getDatabaseOptions(): PostgresDataSourceOptions {
  const sslEnabled = process.env.DB_SSL === 'true';

  let ssl: PostgresDataSourceOptions['ssl'] = false;

  if (sslEnabled) {
    const caPath = process.env.DB_CA_CERT;

    if (!caPath) {
      throw new Error('DB_CA_CERT is required when DB_SSL=true');
    }

    ssl = {
      ca: readFileSync(resolve(process.cwd(), caPath), 'utf8'),
      rejectUnauthorized: true,
    };
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl,

    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],

    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],

    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',
    migrationsTransactionMode: 'all',
  };
}
