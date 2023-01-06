const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 7000;
const con = require("./db/conn");;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.set("views", "../views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, '../public')));

app.use('/assests', express.static('../public'));




app.get("/", (req, res) => {
    res.render("index");
})
app.get("/index.ejs", (req, res) => {
    res.render("index.ejs");
})
app.get("/shift1.ejs", (req, res) => {
    res.render("shift1.ejs");
})
app.get("/shift2.ejs", (req, res) => {
    res.render("shift2.ejs");
})
app.get("/about.ejs", (req, res) => {
    res.render("about.ejs");
})
app.get("/login.ejs", (req, res) => {
    res.render("login.ejs");
})
app.get("/signup.ejs", (req, res) => {
    res.render("signup.ejs");
})
app.get("/admin.ejs", (req, res) => {
    res.render("admin.ejs");
})
app.get("/admin_home.ejs", (req, res) => {
    res.render("admin_home.ejs");
})

//sign up code
app.post("/signup.ejs", (req, res) => {
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
app.post("/login.ejs", (req, res) => {
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

//bus information for admin
app.get("/shift1.ejs", function (req, res,next) {
    let stop = req.body.stop;
    let query = "select route_no,bus_no,address from shift_1 where stop = '" + stop + "'";
    con.query(query, function (err, data,fields) {
        if (err) console.log(err);
        else {
            res.render('/shift1.ejs', {
                title: 'User List',
                userData: data,
                error:false
            });
        }
    })
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})