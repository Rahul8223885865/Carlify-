var express = require("express");
var router = express.Router();

const {
  GetTotalData,
  GetUsers,
  DeleteUser,
  Signin,
  Signup,
  GetCars,
  toggleFeatured
} = require("../controller/admin.controller");

router.post("/signin", Signin);

router.post("/signup", Signup);

router.get("/totalData", GetTotalData);

router.get("/getUsers/:page", GetUsers);

router.get("/getAllCars/:page", GetCars);

router.delete("/deleteUser/:id", DeleteUser);

router.post("/toggle-featured/:id", toggleFeatured);

module.exports = router;
