const mysql = require('mysql2');

// edit koneksi, sesuaikan dengan server anda
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'latihan_node',
  port: 3306
});

module.exports = conn;
