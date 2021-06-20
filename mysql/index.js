const express = require("express");

const config = require("../config.js");

const app = express();

app.listen(config.mysqlService.port, () => {
  console.log("Mysql service listen on port", config.mysqlService.port);
});
