const mysql = require('mysql');

var pool = mysql.createPool({
    host: "mysql",
    user: "root",
    password: "",
    database: "bd_tantakatu"
});

exports.pool = pool;