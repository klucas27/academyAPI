import bd from './connectBD.js'


function createTableUser() {

    const sql = `
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        passwd VARCHAR(255) NOT NULL,
        life INT DEFAULT 3,
        points INT DEFAULT 0,
        status ENUM('active', 'banned', 'inactive') DEFAULT 'active'
        )`

    bd.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Tabela 'users' criada com sucesso!");
        // bd.end();
    });

}

// Inserir novo usuário
export function insertUser({ username, hashedPassword, life = 5, points = 0, status = 'active' }, callback) {
    const sql = `
    INSERT INTO users (username, passwd, life, points, status)
    VALUES (?, ?, ?, ?, ?)`;

    bd.query(sql, [username, hashedPassword, life, points, status], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
}

// Verificar usuario
export function getUserByUsername(username, callback) {
    const sql = `SELECT * FROM users WHERE username = ?`;

    bd.query(sql, [username], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null); // Usuário não encontrado
        callback(null, results[0]);
    });
}
export { createTableUser }