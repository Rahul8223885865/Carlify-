var express = require("express");
var router = express.Router();
let VarifyToken = require("../Token/VarifyToken");

const {
  Signin,
  Signup,
  VerifyEmail,
  UserProfileData,
  ForgotPassword,
  ResetPassword,
  VerifyOtp
} = require("../controller/user.controller");

router.post("/signup", Signup);

router.post("/verifyemail", VerifyEmail);

router.post("/signin", Signin);

router.post("/forgot-password", ForgotPassword);

router.post("/verifyotp", VerifyOtp);

router.post("/reset-password", ResetPassword);

router.get("/users-profile-data/:id",VarifyToken, UserProfileData);



module.exports = router;
