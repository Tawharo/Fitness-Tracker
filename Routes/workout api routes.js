const path = require("path");
const mongojs = require("mongojs");
const { db } = require("../workoutModel.js");

module.exports = (app) => {
  const workouts = require("../workoutModel.js");
  app.post("/api/workouts", (req, res) => {
    workouts
      .create({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", function (req, res) {
    workouts.update(
      {
        _id: mongojs.ObjectId(req.params.id),
      },
      {
        $set: {
          type: req.body.workoutType,
          name: req.body.workoutName,
          weight: req.body.weight,
          sets: req.body.sets,
          reps: req.body.reps,
          duration: req.body.duration,
          distance: req.body.distance,
          date: req.body.date,
        },
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  // gettting all workouts to display find all workouts
  app.get("/api/workouts", (req, res) => {
    workouts
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // find by id then delete
  app.delete("/api/workouts/:id", ({ body }, res) => {
    workouts.findByIdAndDelete({ _id: body.id }).then((data) => {
      res.json(data);
    });
  });

  // find (search mongoose . find.limit) most recent workouts for the last week. .ie 7 workouts. sent. Got code from Angela
  app.get("/api/workouts/range", function (req, res) {
    workouts
      .find({})
      .limit(7)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};