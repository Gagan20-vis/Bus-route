const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 7000;
const bodyParser = require("body-parser");
const indexrouter = require("./src/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static('/public'));

app.use('/', indexrouter);
// app.use('/login.ejs', loginrouter);


app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})

module.exports = app;