const winston = require("winston");
const express = require("express");
const cors = require("cors");
const convey = require('./convey');
const { port } = require('./config.json');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', convey);

const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
