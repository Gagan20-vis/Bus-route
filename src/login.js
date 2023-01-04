const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

app.post("/login.ejs", encoder, function (req, res) {
    var username = req.body.login_user;
    var password = req.body.login_pass;

    connection.query("select * from users where user_name = ? and user_pass = ?", [username, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/admin_home.ejs");
        } else {
            res.redirect("/login.ejs");
        }
        res.end();
    })
})