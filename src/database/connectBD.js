// Conexão com o banco de dados MySQL usando variáveis de ambiente .env (Configurar no servidor, esta incluido no .;gitignore)

import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config();


const pool = mysql.createPool({
  host: process.env.HOST_BD,
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  database: process.env.DATABASE_BD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
