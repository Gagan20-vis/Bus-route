const express = require("express");
const path = require("path");
const app = express();

const port = process.env.port || 7000;

const staticpath = path.join(__dirname, '../public');

app.set("views", "../views");
app.set("view engine", "ejs");

app.use(express.static(staticpath));


require("./db/conn")

app.get("", (req, res) => {
    res.render("index");
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})