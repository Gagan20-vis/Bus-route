const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gagan@20"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});