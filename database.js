const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gagan@20",
    database: "bus"
})

con.connect(function (err) {
    if (err)
        console.log(err);
    else console.log("Database Connected!");
})

module.exports = con;