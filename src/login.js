const express = require("express");
const app = express();
const path = require("path");

const con = require('./db/admin_login');

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.post("/signup.ejs", (req, res) => {
    var erp = req.body.erp;
    var email = req.body.signup_email;
    var password = req.body.signup_pass;
    var conf_pass = req.body.conf_pass;

    con.connect(function (err) {
        if (err) console.log(err);
        else {
            sql = "select * from users where erp = '" + erp + "'";
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                else {
                    if (result.length) {
                        res.send('users already exists');
                    } else {
                        if (password === conf_pass) {
                            con.connect(function (err) {
                                if (err) console.log(err);
                                else {
                                    sql = "INSERT INTO users(erp,email,user_pass) values('" + erp + "','" + email + "','" + password + "');";
                                    con.query(sql, function (err, result) {
                                        if (err) console.log(err);
                                        else {
                                            res.send("successfull!");
                                        }
                                    })
                                }
                            })
                        } else {
                            res.send("password does not match")
                        }
                    }
                }
            })
        }
    })
})

app.post("/login.ejs", (req, res) => {
    var username = req.body.login_user;
    var password = req.body.login_pass;

    con.connect(function (err, rows) {
        if (err) console.log(err);
        else {
            con.query("SELECT erp,user_pass FROM users WHERE erp = ? ", [username],
                function (err, rows) {
                    if (err)
                        console.log(err);
                    if (!rows.length) {
                        res.send('No User Found');
                    }
                    if (password != rows[0].user_pass)
                        res.send('Wrong password')
                    else
                        res.redirect('/admin_home.ejs');
                });
        }
    })
})
