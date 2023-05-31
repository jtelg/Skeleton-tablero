import { createPool } from 'mysql2/promise';
const obj_config = {
  host: process.env.NEXT_PUBLIC_DATABASE_HOST,
  port: process.env.NEXT_PUBLIC_DATABASE_PORT,
  user: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
  password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASE_DB
};

const conexionDB = createPool(obj_config);

export { conexionDB };
