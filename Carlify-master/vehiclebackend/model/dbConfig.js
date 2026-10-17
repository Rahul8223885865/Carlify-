let mongoose = require("mongoose");
require("dotenv").config();

let MongoUrl = process.env.MONGO_URL;

mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("Connected to MongoDB Server!");
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

module.exports = connection;
