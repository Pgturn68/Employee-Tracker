const mysql = require ("mysql2");

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "Koengrey@0726",
    database: "employees"  
});
connection.connect();
module.exports= connection;