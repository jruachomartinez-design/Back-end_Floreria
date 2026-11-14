import 'dotenv/config';

import { DataSource } from 'typeorm';
import { getDatabaseOptions } from './database.config';

const AppDataSource = new DataSource(getDatabaseOptions());

export default AppDataSource;
