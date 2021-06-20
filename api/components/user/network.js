const express = require("express");
const secure = require("./secure");
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

const get = (req, res, next) => {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
};

const upsert = (req, res, next) => {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
};

const follow = (req, res, next) => {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
};

const following = (req, res, next) => {
  Controller.following(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
};

router.get("/", list);
router.post("/follow/:id", secure("follow"), follow);
router.get("/:id/following", secure("follow"), following);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

module.exports = router;
