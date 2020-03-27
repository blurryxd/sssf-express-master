'use strict';
require('dotenv').config();

const db = require('./model/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const authRoute = require('./routes/authRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const catsRoute = require('./routes/catsRoute');
const passport = require('./utils/pass');


app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));


app.use('/cats', catsRoute);
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);


db.on('connected', () => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

