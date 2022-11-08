/* eslint-disable @typescript-eslint/no-unused-vars */
/*import { Pool } from 'pg';
import config from './config';
//import dotenv from 'dotenv';

//dotenv.config();

const pool = new Pool({
  host: config.host,
  port: parseInt(config.dbport as unknown as string),
  database: config.database,
  user: config.user,
  password: config.password
  
});
export default pool;
*/

/*import { Pool } from 'pg';
import dotenv from 'dotenv';
//import bcrypt from 'bcrypt'

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.NODE_ENV === 'dev' ? process.env.DB_DATABASE : process.env.DB_DATABASE_TEST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

pool.on('error', (error: Error) => {
  console.error(error.message);
});

export default pool;
*/

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_DATABASE, DB_DATABASE_TEST, DB_PASSWORD, NODE_ENV } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: NODE_ENV === 'dev' ? DB_DATABASE : DB_DATABASE_TEST,
  password: DB_PASSWORD
});
export default pool;
