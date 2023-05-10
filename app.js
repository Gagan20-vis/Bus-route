const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require("body-parser");
const indexrouter = require("./src/index");
const favicon = require('serve-favicon');
const cookieParser = require("cookie-parser");
const port = process.env.port || 7000;

app.set("view engine", "ejs");

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static('/public'));
app.use(session({
    secret: 'Gaganproject',
    saveUninitialized: false,
    resave: false
}));
app.use(flash());
app.use('/', indexrouter);

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})

module.exports = app;