const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const hiddenVars = require("./secrets");

var setUpPassport = require("./setuppassport");

const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const signupRouter = require("./routes/signup");

const app = express();
mongoose.connect(hiddenVars.dbConnect, { useMongoClient: true });
setUpPassport();
const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "MzgcgCQuOu3airU209xkd$$$",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(loginRouter);
app.use(logoutRouter);
app.use(signupRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/testAuth", (req, res) => {
  if (req.isAuthenticated) {
    console.log(req.user);
  } else {
    console.log("NOT AUTHENTICATED");
  }
});

app.listen(3001, () => {
  console.log("bleh, i'm alive");
});

module.exports = app;
