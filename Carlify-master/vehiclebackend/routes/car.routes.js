var express = require("express");
var router = express.Router();
let upload = require("../utility/multer");
let VarifyToken = require("../Token/VarifyToken");
const {
  AddCar,
  GetCar,
  GetAllCars,
  GetCarDetails,
  EditCarDetails,
  GetCarByBrand,
  GetFeaturedCars
} = require("../controller/car.controller");

router.post("/addCar", VarifyToken, upload.single("image"), AddCar);

router.get("/getCar/:userId", VarifyToken, GetCar);

router.get("/getallcars", GetAllCars);

router.get("/cardetails/:id", GetCarDetails);

router.get("/brand/:brand", GetCarByBrand);

router.post("/editCarDetails",VarifyToken, upload.single("image"), EditCarDetails);

router.get("/featured-cars", GetFeaturedCars);



module.exports = router;
