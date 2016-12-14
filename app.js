if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
 }

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const db = require('./config/db')

const routes = require('./routes/index');

const app = express();

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(allowCrossDomain);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
