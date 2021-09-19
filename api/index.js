const express = require("express");
const swaggerUi = require("swagger-ui-express");

const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors");

const app = express();
const swaggerDoc = require("./swagger.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(errors);

app.listen(config.api.port, () => {
  console.log("Api listen on port", config.api.port);
});
