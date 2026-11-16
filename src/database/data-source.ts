import { config as loadEnv } from 'dotenv';
import { DataSource } from 'typeorm';

import { getDatabaseOptions } from './database.config';

loadEnv({
  path: '.env',
  override: true,
});

export default new DataSource(getDatabaseOptions());
