require('dotenv').config();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure('./server/templates', {
  autoescape: true,
  express: app,
});

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(express.static('browser/public'));

const router = require('./server/routes');

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`App is listening on port ${this.address().port}`));
});

module.exports = app;
