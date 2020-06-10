const router = require("express").Router();
// const Transaction = require("../models/transaction.js");
var path = require("path");
const Workout = require("../models/workout.js");

router.post("/exercise", ({ body }, res) => {
  Workout.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


module.exports = router;
