var express = require("express");
var router = express.Router();
var Car = require("../model/carSchema");

/* GET home page. */
router.get("/email", function (req, res, next) {
  res.send("Email sent!");
});



router.get("/homePageData", async function (req, res, next) {
  try {
    let featuredCars = await Car.find({ Featured: true }).limit(3);
    let recentCars = await Car.find({}).sort({ createdAt: -1 }).limit(4);

    return res.json({
      status: true,
      message: "Home page data fetched successfully",
      featuredCars,
      recentCars
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error fetching home page data",
      error: error.message
    });
  }
});

module.exports = router;
