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
        bd.end();
    });

}

export {createTableUser}