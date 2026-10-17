const jwt = require("jsonwebtoken");
require("dotenv").config();
let User = require("../model/userSchema");
const { ObjectId } = require("mongodb");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // verifying the token
  // console.log(token);

  if (!token) {
    return res
      .status(200)
      .json({ status: false, message: "Access Denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, data) {
    if (!err) {
      try {
        let isVerify = await User.findOne({
          _id: new ObjectId(data.id),
          email: data.email,
        });
        if (!isVerify) {
          return res.status(200).json({ message: "Token not valid!" });
        }
        next();
      } catch (error) {
        console.log(error);
      }
    } else {
      if (err.name == "TokenExpiredError") {
        return res.status(200).json({ message: "Session Expired Please SignIn Again!" });
      } else if (err.name == "JsonWebTokenError") {
        return res.status(200).json({ message: "invalid token provided!" });
      } else {
        return res.status(200).json({ message: err.message });
      }
    }
  });

  // redirecting to next functions
};

module.exports = verifyToken;
