const express = require('express');
const cors = require('cors')
const router = require('../routes/router')
const app = express();


// cors middlware
app.use(cors())

// json request
app.use(express.json());

// middleware for templating
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

// Static site for middleware use
app.use(express.static('public'));
app.use(express.static('views'));

// Routes
app.use('/', router)



module.exports = app;