const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

const list = (req, res, next) => {
  Controller.list()
    .then((resList) => {
      response.success(req, res, resList, 200);
    })
    .catch(next);
};

router.get("/", list);

module.exports = router;
