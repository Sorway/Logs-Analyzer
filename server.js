const express = require('express');
const morgan = require('morgan');
const moment = require('moment-timezone');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./router');
require('dotenv').config();

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
server.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'tmp/'
}));

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

morgan.token('paris-hour', () => {
    return moment().tz('Europe/Paris').format('HH:mm');
});
server.use(morgan('[:paris-hour] :method :url :status :response-time ms'));

server.use('/', router);
server.use(express.static(__dirname + '/public'));

server.use(function (req, res, next) {
    res.redirect('/');
});

const PORT = process.env.PORT || 25572;
server.listen(PORT, function () {
    console.log(`Server listing on port ${PORT}.`);
});