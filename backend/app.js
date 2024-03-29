const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");

const { environment } = require("./config");
const routes = require("./routes");
const isProduction = environment === "production";

//initializing express application:
const app = express();

//connecting morgan middleware:
app.use(morgan("dev"));

//adding cookie parser middleware for parsing cookies
//adding express.json middleware for parsing json bodies:
app.use(cookieParser());
app.use(express.json());

//adding several security middlewares:
//cors, helment, csurf
// if (!isProduction) {
app.use(cors());
// }

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

//Connecting the resource not found error handler:
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

//Process sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize validation error";
  }
  next(err);
});

//Error Formatter Error-Handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
