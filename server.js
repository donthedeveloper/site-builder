const chalk = require('chalk');
const app = require('./app');

app.listen(process.env.PORT || 3000, function () {
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`App is listening on port ${this.address().port}`));
});
