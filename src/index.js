const express = require('express')
const router = express.Router();
const con = require("../database");
const bcrypt = require("bcrypt");
const sessionChecker = (req, res, next) => {
    if (req.session.userId && req.cookies.sessionId) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get("/", (req, res) => {
    res.render("index");
})
router.get("/index", (req, res) => {
    res.render("index");
})
router.get("/about", (req, res) => {
    res.render("about");
})
router.get("/login", (req, res) => {
    res.render("login", {
        message: req.flash('success')
    });
})
router.get("/signup", (req, res) => {
    res.render("signup", {
        message: req.flash('success')
    });
})
router.get("/admin_home", sessionChecker, (req, res) => {
    res.render("admin_home");
})

//admin shift1
router.get("/admin_shift1", sessionChecker, (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select id,route_no,bus_no,address from shift_1";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("admin_shift1", {
                    data: result,
                    action: 'list',
                    message: req.flash('success')
                })
            }
        })
    })
})

//add data by admin
router.post("/admin_shift1", sessionChecker, (req, res) => {
    let route_no = req.body.route_no;
    let bus_no = req.body.bus_no;
    let address = req.body.address;
    let query = "insert into shift_1(route_no,bus_no,address) values('" + route_no + "','" + bus_no + "','" + address + "');";
    con.query(query, function (err) {
        if (err) {
            console.log(err);
        } else {
            req.flash('success', 'Data Inserted');
            res.redirect("/admin_shift1");
        }
    })
})

//delete data by admin
router.get('/delete/:id', sessionChecker, function (req, res) {

    let id = req.params.id;
    let query = `DELETE FROM shift_1 WHERE id = "${id}"`;
    con.query(query, function (err) {
        if (err) console.log(err);
        else {
            req.flash('success', 'Data Deleted');
            res.redirect("/admin_shift1");
        }
    })
});
router.get('/edit/:id', sessionChecker, function (req, res) {

    let id = req.params.id;
    let query = `SELECT * FROM shift_1 WHERE id = "${id}"`;
    con.query(query, function (err, data) {
        if (err) console.log(err);
        else {
            res.render('admin_shift1', {
                action: 'edit',
                data: data[0],
                message: req.flash('success')
            })
        }
    })
});
//delete data by admin
router.post('/edit/:id', sessionChecker, function (req, res) {

    let id = req.params.id;
    let route_no = req.body.route_no_u;
    let bus_no = req.body.bus_no_u;
    let address = req.body.address_u;
    let query = `
	UPDATE shift_1 
	SET route_no = "${route_no}", 
	bus_no= "${bus_no}", 
	address = "${address}"
	WHERE id = "${id}"
	`;
    con.query(query, function (err, data) {
        if (err) console.log(err);
        else {
            req.flash('success', 'Data Updated');
            res.redirect('/admin_shift1');
        }
    })
});

//admin shift2
router.get("/admin_shift2", sessionChecker, (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_2";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("admin_shift2", {
                    data: result,
                    action: 'list',
                    message: req.flash('success')
                })
            }
        })
    })
})
//add data by admin
router.post("/admin_shift2",sessionChecker, (req, res) => {
    let route_no = req.body.route_no;
    let bus_no = req.body.bus_no;
    let address = req.body.address;
    let query = "insert into shift_2(route_no,bus_no,address) values('" + route_no + "','" + bus_no + "','" + address + "');";
    con.query(query, function (err) {
        if (err) {
            console.log(err);
        } else {
            req.flash('success', 'Data Inserted');
            res.redirect("/admin_shift2");
        }
    })
})
//bus list for students for shift1
router.get("/shift1", sessionChecker, function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_1";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("shift1", {
                    data: result,
                    shift: "1"
                })
            }
        })
    })
})

//bus list for students for shift2
router.get("/shift2",sessionChecker, function (req, res) {
    con.connect(function (err) {
        if (err) throw err;
        let query = "select route_no,bus_no,address from shift_2";
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render("shift2", {
                    data: result,
                    shift: "2"
                })
            }
        })
    })
})

//sign up code
router.post("/signup",(req, res) => {
    var erp = req.body.erp;
    var email = req.body.signup_email;
    var password = req.body.signup_pass;
    var conf_pass = req.body.conf_pass;
    sql = "select * from admin_login where erp = '" + erp + "'";
    con.query(sql, async function (err, result) {
        if (err);
        else {
            if (result.length) {
                req.flash('Error', 'users already exists');
                res.redirect("/signup");
            } else {
                if (password === conf_pass) {
                    const hash_pass = await bcrypt.hash(password, 10);
                    sql = "INSERT INTO admin_login(erp,email,user_pass) values('" + erp + "','" + email + "','" + hash_pass + "');";
                    con.query(sql, function (err, result) {
                        if (err) {
                            req.flash('success', 'You are not authorized admin.');
                            res.redirect("/signup");
                        } else {
                            req.flash('success', 'You are signed up');
                            res.redirect("/login");
                        }
                    })
                } else {
                    req.flash('success', "password does not match");
                    res.redirect("/signup");
                }
            }
        }
    })
})

//login code
router.post("/login", async (req, res) => {
    let username = req.body.login_user;
    let password = req.body.login_pass;
    con.query("SELECT erp,user_pass FROM admin_login WHERE erp = ? ", [username],
        async function (err, rows) {
            if (err)
                console.log(err);
            else if (rows.length == 0) {
                req.flash('success', "No user found");
                res.redirect('/login');
            }
            else
            {
                const isMatch = await bcrypt.compare(password, rows[0].user_pass);
                if (isMatch) {
                    req.session.userId = username;
                    res.cookie('sessionId', req.session.id);
                    res.redirect('/admin_home');
                } else {
                    req.flash('success', "Wrong Credentials");
                    res.redirect('/login');
                }
            }
        });
})

// router.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) console.log(err);
//       res.clearCookie('sessionid');
//       res.sendStatus(200);
//     });
// });
  
module.exports = router;