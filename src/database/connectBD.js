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


// // Conectar ao banco
// pool.connect((err) => {
//   if (err) {
//     console.error('Erro na conexão:', err.stack);
//     return;
//   }
//   console.log('Conectado ao MySQL como ID', pool.threadId);
// });

export default pool;
