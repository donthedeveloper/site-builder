require('@babel/polyfill');
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
const MongoStore = require('connect-mongo')(session);
const router = require('./server/routes');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/siteBuilder';
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true },
);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));

app.use(
  session({
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'imasecret',
    store: new MongoStore({
      mongooseConnection: db,
    }),
  }),
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('browser/dist'));

app.use('/', router);

module.exports = app;
