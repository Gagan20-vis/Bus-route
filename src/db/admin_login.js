const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gagan@20",
    database: "sql_login"
})

con.connect(function (err) {
    if (err)
        console.log(err);
    else console.log("Login Connect!");
})

module.exports = con;