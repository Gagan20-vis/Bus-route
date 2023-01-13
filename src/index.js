const express = require('express')
const router = express.Router();
const con = require("../database");

router.get("/", (req, res) => {
    res.render("index");
})
router.get("/index.ejs", (req, res) => {
    res.render("index.ejs");
})
router.get("/about.ejs", (req, res) => {
    res.render("about.ejs");
})
router.get("/login.ejs", (req, res) => {
    res.render("login.ejs");
})
router.get("/signup.ejs", (req, res) => {
    res.render("signup.ejs");
})
router.get("/admin_home.ejs", (req, res) => {
    res.render("admin_home.ejs");
})

//admin shift1
router.get("/admin_shift1.ejs", (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_1";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("admin_shift1.ejs", {
                    data: result,
                    action: 'add'
                })
            }
        })
    })
})

//admin shift2
router.get("/admin_shift2.ejs", (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_2";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("admin_shift2.ejs", {
                    data: result
                })
            }
        })
    })
})

//bus list for students for shift1
router.get("/shift1.ejs", function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_1";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("shift1.ejs", {
                    data: result
                })
            }
        })
    })
})

//bus list for students for shift2
router.get("/shift2.ejs", function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_2";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("shift2.ejs", {
                    data: result
                })
            }
        })
    })
})

//sign up code
router.post("/signup.ejs", (req, res) => {
    var erp = req.body.erp;
    var email = req.body.signup_email;
    var password = req.body.signup_pass;
    var conf_pass = req.body.conf_pass;

    con.connect(function (err) {
        if (err) console.log(err);
        else {
            sql = "select * from admin_login where erp = '" + erp + "'";
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
                                    sql = "INSERT INTO admin_login(erp,email,user_pass) values('" + erp + "','" + email + "','" + password + "');";
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

//login code
router.post("/login.ejs", (req, res) => {
    var username = req.body.login_user;
    var password = req.body.login_pass;

    con.connect(function (err, rows) {
        if (err) console.log(err);
        else {
            con.query("SELECT erp,user_pass FROM admin_login WHERE erp = ? ", [username],
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

module.exports = router;