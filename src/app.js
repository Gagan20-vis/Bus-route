const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 7000;

app.set("views", "../views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, '../public')));

app.use('/assests', express.static('../public'));

require("./db/conn")

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
app.get("/about.ejs", (req,res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})