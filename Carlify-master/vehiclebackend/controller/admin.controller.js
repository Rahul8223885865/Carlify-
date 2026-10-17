let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

const Admin = require("../model/adminSchema");
let Car = require("../model/carSchema");
let User = require("../model/userSchema");

const Signup = async (req, res, next) => {
  let data = req.body;
  let { name, email, mobile, password } = data;
  if (!(name && email && mobile && password)) {
    return res.status(200).json({
      status: false,
      message: "Please fill all the fields",
    });
  }

  try {
    let isAlreadyExist = await Admin.findOne({
      $or: [{ email: data.email }, { mobile: data.mobile }],
    });
    if (isAlreadyExist) {
      return res.json({ status: false, message: "Admin already exists" });
    }
    let salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    let newAdmin = new Admin(data);
    await newAdmin.save();

    return res.status(200).json({
      status: true,
      message: "Admin Added!",
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const Signin = async (req, res, next) => {
  let data = req.body;
  let { email, password } = data;
  if (!(email && password)) {
    return res.status(200).json({
      status: false,
      message: "Please fill all the fields",
    });
  }

  try {
    let admin = await Admin.findOne({ email: data.email });
    if (!admin) {
      return res.json({
        status: false,
        message: `Admin not added..!`,
      });
    }
    // console.log(admin);

    let isMatch = await bcrypt.compare(data.password, admin.password);
    if (!isMatch) {
      return res.json({
        status: false,
        message: `Invalid password`,
      });
    }

    // Token Generation and send
    const token = jwt.sign(
      { id: admin._id, email: req.body.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20m", // 20min.
      }
    );
    admin.password = undefined;
    return res.status(200).json({
      status: true,
      message: "Sign In Succes!",
      admin,
      token: token,
    });
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};

const GetTotalData = async (req, res, next) => {
  try {
    let totallistings = await Car.countDocuments();
    let totalUsers = await User.countDocuments();

    let recentListings = await Car.find().sort({ createdAt: -1 }).limit(5);
    let recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    let verifiedUsers = await User.countDocuments({ isVerified: true });

    if (totallistings) {
      return res.status(200).json({
        status: true,
        totallistings,
        totalUsers,
        recentListings,
        recentUsers,
        verifiedUsers,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Data not found!",
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetUsers = async (req, res, next) => {
  try {
    let page = req.params.page;
    let users = await User.find()
      .skip((page - 1) * 10)
      .limit(10);

    let totalPage = await User.countDocuments();
    totalPage = Math.ceil(totalPage / 10);
    if (users) {
      return res.status(200).json({
        status: true,
        page,
        totalPage,
        users,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Users not found!",
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const DeleteUser = async (req, res, next) => {
  let id = req.params.id;
  try {
    let isDeleted = await User.deleteOne({ _id: id });
    if (!(isDeleted.acknowledged && isDeleted.deletedCount > 0)) {
      return res.status(200).json({
        status: false,
        message: "User not deleted!",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Users deleted!",
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetCars = async (req, res, next) => {
  try {
    let page = req.params.page;
    let cars = await Car.find().sort({ createdAt: -1 }).skip((page - 1) * 10).limit(10);

    let totalPage = await Car.countDocuments();
    totalPage = Math.ceil(totalPage / 10);
    if (cars) {
      return res.status(200).json({
        status: true,
        page,
        totalPage,
        cars,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Cars not found!",
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
}

const toggleFeatured = async (req, res) => {
  let id = req.params.id;
  try {
    let car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ status: false, message: "Car not found" });
    }
    car.Featured = !car.Featured;

    await car.save();

    return res.json({
      status: true,
      message: `Car marked as ${car.Featured ? "Featured" : "Unfeatured"}`,
    });

  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports = { GetTotalData, GetUsers, DeleteUser, Signup, Signin, GetCars,toggleFeatured };
