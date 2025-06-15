import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config();


const connection = mysql.createConnection({
  host: process.env.HOST_BD,
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  database: process.env.DATABASE_BD
});


// Conectar ao banco
connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL como ID', connection.threadId);
});

export default connection;
