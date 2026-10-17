let User = require("../model/userSchema");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const { sendWelcomeEmail, sendOTP } = require("../utility/sendEmail");
const Car = require("../model/carSchema");

// Generate Random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const Signup = async (req, res, next) => {
  try {
    let data = req.body;

    if (!data.name || !data.email || !data.mobile || !data.password) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are required" });
    }

    // Check if user already exists
    let isAlreadyExist = await User.findOne({
      $or: [{ email: data.email }, { mobile: data.mobile }],
    });

    if (isAlreadyExist && isAlreadyExist.isVerified) {
      return res.json({ status: false, message: "User already exists" });
    }

    // Delete unverified user if exists
    if (isAlreadyExist) {
      await User.deleteOne({ _id: isAlreadyExist._id });
    }

    // Hash password
    let salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    // Generate OTP
    let otp = generateOTP();
    data.otp = otp;
    data.otpExpires = new Date(Date.now() + 5 * 60000); // OTP expires in 5 mins

    let newUser = new User(data);
    await newUser.save();

    // Send OTP email
    sendOTP({ email: data.email, userName: data.name, otp });

    return res
      .status(200)
      .send({ status: true, message: "Please verify your email address" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const Signin = async (req, res, next) => {
  let data = req.body;
  if (!data.email || !data.password) {
    res.send({ status: false, message: "All fields are required" });
    return;
  }
  try {
    let user = await User.findOne({ email: data.email });
    if (!(user && user.isVerified)) {
      return res.json({
        status: false,
        message: `Email does not exists please signup!`,
      });
    }
    // console.log(user);

    let isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.json({
        status: false,
        message: `Invalid password`,
      });

    }

    // Token Generation and send
    const token = jwt.sign(
      { id: user._id, email: req.body.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20m", // 20min.
      }
    );

    user.password = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;

    res.status(200).json({
      status: true,
      message: "Sign In Succes!",
      user: user,
      token: token,
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const VerifyEmail = async (req, res, next) => {
  let { email, otp } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user.otp !== otp) {
      return res.json({ status: false, message: "Invalid OTP" });
    } else {
      if (user.otpExpires < new Date()) {
        return res.json({
          status: false,
          message: "OTP Expired Request New OTP!",
        });
      } else {
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();
        sendWelcomeEmail({ email: user.email, userName: user.name });
        return res.json({
          status: true,
          message: "Email Verified Successfully!",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const UserProfileData = async (req, res, next) => {
  let { id } = req.params;
  try {
    let vehicles = await Car.find({ userId: id }).limit(3);
    return res.json({
      status: true,
      message: "User Profile Data",
      vehicles
    });
  } catch (error) {
    console.log(error);
  }
};


const ForgotPassword = async (req, res, next) => {
  let email = req.body.email;

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.json({ status: false, message: "Email does not exist!" })
    }

    let otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60000); // OTP expires in 5 mins
    await user.save();

    sendOTP({ email: user.email, userName: user.name, otp });

    return res.json({ status: true, message: "OTP send to email!" })

  } catch (error) {
    return res.json({ status: false, message: error.message })
  }
}

const VerifyOtp = async (req, res, next) => {

  let { email, otp } = req.body;
  try {
    let user = await User.findOne({ email })
    if (user.otp !== otp) {
      return res.json({ status: false, message: "Invalid OTP" });
    } else {
      if (user.otpExpires < new Date()) {
        return res.json({
          status: false,
          message: "OTP Expired Request New OTP!",
        });
      } else {
        return res.json({ status: true, message: "OTP verified! please change your password" });

      }
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

const ResetPassword = async (req, res, next) => {

  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email })

    // password hash
    let salt = bcrypt.genSaltSync(10)

    user.password = await bcrypt.hashSync(password, salt)
    await user.save()
    return res.json({ status: true, message: "Password Changed Successfully" })
  } catch (error) {
    return res.json({ status: false, message: error.message })

  }

}

module.exports = { Signup, Signin, VerifyEmail, UserProfileData, ForgotPassword, ResetPassword, VerifyOtp };
