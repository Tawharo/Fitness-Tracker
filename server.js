const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/workout-api-routes");
const staticRoutes = require("./routes/html-routes");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// const databaseUrl = "Workout";
// const collections = ["workouts"];

// const db = mongojs(databaseUrl, collections);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbWorkout", {
//   useNewUrlParser: true,
// });

// Language used to host app and database on Heroku
mongoose.connect(
  process.env.MONGODB_URI ||
    "mondodb://mongodb://pumpitup:pumpitup1@ds041678.mlab.com:41678/heroku_sg6gsl3b",
  {
    useMongoClient: true,
  }
);
// mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/dbWorkout", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });

apiRoutes(app);
staticRoutes(app);

app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});