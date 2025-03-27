var createError = require("http-errors");
var environnement = require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth.routes");
var roleRouter = require("./routes/role");
var emailRouter = require("./routes/email");
var rendez_vousRouter = require("./routes/rendez_vous");
var serviceRouter = require("./routes/service");
var packRouter = require("./routes/pack");
var missionRouter = require("./routes/mission");

var app = express();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      authSource: "admin", // Often needed for authentication
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    });
    console.log("Connexion réussie à la base de données");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données:", error);
    process.exit(1); // Quitte le processus si la connexion échoue
  }
}

connectDB();

// Rate limiter configuration
/*const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});*/

// Apply rate limiter to all routes
//app.use(limiter);

app.use(logger("dev"));
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      authSource: "admin", // Often needed for authentication
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    });
    console.log("Connexion réussie à la base de données");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données:", error);
    process.exit(1); // Quitte le processus si la connexion échoue
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Security middleware
app.use(helmet());

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/roles", roleRouter);
app.use("/email", emailRouter);
app.use("/rdv", rendez_vousRouter);
app.use("/services", serviceRouter);
app.use("/packs", packRouter);
app.use("/missions", missionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
