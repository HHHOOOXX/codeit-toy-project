var mysql = require("mysql2");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'jeongho1122!',
    database: 'memory'
});
connection.connect();

connection.query('SELECT * from Users', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
});

connection.end();