const mysql = require("mysql2");
require("dotenv").config();
const con = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

con.connect(function (err) {
    if (err)
        console.log(err);
    else console.log("Database Connected!");
})

module.exports = con;