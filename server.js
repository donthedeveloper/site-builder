const chalk = require('chalk');
const app = require('./app');

app.listen(process.env.PORT || 3000, function () {
  console.log(chalk.blue(`App is listening on port ${this.address().port}`));
});
