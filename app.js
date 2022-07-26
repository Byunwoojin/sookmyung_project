const express = require("express");

const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");

app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
  res.send("Hello Woojin");
});

app.get("/user", (req, res) => {
  res.send("Hello Hello");
});

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.info("hello");
  logger.error(error.message);
  next(error);
});

module.exports = app;
