require("dotenv").config();
const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const session = require("express-session");

const app = express();
const MongoStore = require("connect-mongo")(session);

const mongoUri = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/siteBuilder';
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(
  session({
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    resave: true,
    saveUnitialized: false,
    secret: process.env.SESSION_SECRET
      ? process.env.SESSION_SECRET
      : "imasecret",
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure("./server/templates", {
  autoescape: true,
  express: app
});

app.engine("html", nunjucks.render);
app.set("view engine", "html");

app.use(express.static("browser/public"));

const router = require("./server/routes");
app.use("/", router);

app.listen(process.env.PORT || 3000, function() {
  console.log(chalk.blue(`App is listening on port ${this.address().port}`));
});

module.exports = app;
