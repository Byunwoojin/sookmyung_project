const express = require("express");
const cors = require("cors");

const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const fs = require("fs");
const hpp = require("hpp");
const morgan = require("morgan");
const static = require("serve-static");
const path = require("path");
const { spawn } = require("child_process");

const tf = require("@tensorflow/tfjs");
let tfnode = require("@tensorflow/tfjs-node");

var sequelize = require("./models").sequelize;
//서버 실행 시 mySQL과 연동
sequelize
  .sync()
  .then(() => {
    console.log("db connect success");
  })
  .catch((err) => {
    console.error(err);
  });

const indexRouter = require("./routes");
const uploadRouter = require("./routes/upload");
const getImageRouter = require("./routes/image");
const modelRouter = require("./routes/model");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  cors({ origin: ["http://localhost:3000", "https://catch-front.vercel.app/"] })
);

app.set("port", process.env.PORT || 3000);
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.use("/image", getImageRouter);
app.use("/model", modelRouter);

app.use("/public", express.static(path.join(__dirname, "public")));

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
