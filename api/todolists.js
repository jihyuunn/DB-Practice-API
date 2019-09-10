var express = require("express");
var router = express.Router();
var Todolist = require("../models/todolist");
var mongoose = require("mongoose");

router.get("/", function(req, res) {
  Todolist.find({}, function(err, todolists) {
    if (err) return res.json(err);
    res.json({ success: true, data: todolists });
  });
});

router.post(
  "/",
  function(req, res, next) {
    Todolist.findOne({})
      .sort({ id: -1 })
      .exec(function(err, todolist) {
        if (err) {
          res.status(500);
          return res.json({ success: false, message: err });
        } else {
          res.locals.lastId = todolist ? todolist.id : 0;
          next();
        }
      });
  },
  function(req, res, next) {
    var newTodo = new Todolist(req.body);
    newTodo.id = res.locals.lastId + 1;
    newTodo.save(function(err, todo) {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: todo });
      }
    });
  }
);

module.exports = router;
