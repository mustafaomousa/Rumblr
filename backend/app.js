const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const { cookie } = require('express-validator');
const isProduction = environment === 'production';

//initializing express application:
const app = express();

//connecting morgan middleware:
app.use(morgan('dev'));

//adding cookie parser middleware for parsing cookies
//adding express.json middleware for parsing json bodies:
app.use(cookieParser());
app.use(express.json());

//adding several security middlewares:
//cors, helment, csurf
if (!isProduction) {
    app.use(cors());
};

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}));