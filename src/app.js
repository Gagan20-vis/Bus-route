const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 7000;
const staticpath = path.join(__dirname, './public');
app.use(express.static(staticpath));
app.set('view engine', 'ejs');
require("./db/conn")


app.get("/", (req, res) => {
    res.send("Home page ");
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})