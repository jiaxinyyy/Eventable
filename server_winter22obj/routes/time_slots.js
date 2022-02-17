const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const timeSlotsRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// Get a list of all the time slots in the time slots pool
    // create a new collection called "time slots"
timeSlotsRoutes.route("/time_slots").get(function (req, res) {
  let db_connect = dbo.getDb("employees"); // employee??
  db_connect
    .collection("time_slots")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get one particular time slot
timeSlotsRoutes.route("/time_slots/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("time_slots")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// Add a new time slot, used in time slots pool webpage
timeSlotsRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    dayTime: req.body.dayTime,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    coefficient: req.body.coefficient,
  };
  db_connect.collection("time_slots").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update a time slot by id
timeSlotsRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        dayTime: req.body.dayTime,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        coefficient: req.body.coefficient,
    },
  };
  db_connect
    .collection("time_slots")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Delete a record
timeSlotsRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("time_slots").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 time slot deleted");
    response.status(obj);
  });
});
 


module.exports = timeSlotsRoutes;