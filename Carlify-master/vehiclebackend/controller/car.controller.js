let Car = require("../model/carSchema");
let cloudinary = require("../utility/cloudinary");
let fs = require("fs");

const AddCar = async (req, res, next) => {
  const requiredFields = [
    "userId",
    "brand",
    "model",
    "year",
    "fuelType",
    "transmission",
    "kilometer",
    "owners",
    "color",
    "price",
    "negotiable",
    "insurance",
    "location",
    "sellerName",
    "contactNumber",
    "email",
  ];
  if (!req.file || !requiredFields.every((field) => req.body[field])) {
    return res
      .status(200)
      .json({ status: false, message: "All fields are required" });
  }
  try {
    let uploadImageToCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "Car-Images",
      resource_type: "auto",
    });

    if (uploadImageToCloud.secure_url) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }

    req.body.image = uploadImageToCloud.secure_url;

    let newCar = new Car(req.body);
    let response = await newCar.save();

    if (response) {
      return res.status(200).json({
        status: true,
        message: "Car Listed successfully",
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Failed to list car",
      });
    }
  } catch (error) {
    // console.error("Error:", error);
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetCar = async (req, res, next) => {
  let userId = req.params.userId;
  // console.log(userId);
  try {
    let carData = await Car.find({ userId: userId });
    if (carData.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Car Data Found...",
        carData: carData,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Car data not found please list cars!",
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetAllCars = async (req, res, next) => {
  try {
    let carData = await Car.find();
    if (carData.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Car Data Found...",
        carData: carData,
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetCarByBrand = async (req, res, next) => {
  try {
    let carData = await Car.find({ brand: req.params.brand });
    if (carData.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Car Data Found...",
        carData
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetCarDetails = async (req, res, next) => {
  const isAdmin = req?.query?.isAdmin === "true" || false;
  let id = req.params.id;
  try {
    let carDetails = await Car.findById({ _id: id });
    if (carDetails) {
      if (isAdmin) {
        carDetails.views += 0;
      } else {
        carDetails.views += 1;
      }
      await carDetails.save();

      // Fetch similar cars (same brand, exclude current car)
      const similarCars = await Car.find({ brand: carDetails.brand, _id: { $ne: carDetails._id } }).limit(4);

      // Fetch recommended cars (within 20% price range, exclude current car)
      const minPrice = carDetails.price * 0.8;
      const maxPrice = carDetails.price * 1.2;
      const recommendedCars = await Car.find({
        price: { $gte: minPrice, $lte: maxPrice },
        _id: { $ne: carDetails._id }
      }).limit(4);

      return res.status(200).json({
        status: true,
        message: "Car Details Found...",
        carDetail: carDetails,
        similarCars,
        recommendedCars
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Car details not found",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

const GetFeaturedCars = async (req, res, next) => {

  try {
    let featuredCars = await Car.find({ Featured: true });
    if (featuredCars) {
      return res.json({
        status: true,
        message: "Featured Cars Found...",
        featuredCars
      });
    } else {
      return res.json({
        status: false,
        message: "Featured Cars not found",
      });
    }

  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

const EditCarDetails = async (req, res) => {
  try {
    const { _id, userId, ...updateFields } = req.body;
    // if (!userId || !_id) return res.status(400).json({ status: false, message: "User ID and Car ID are required" });

    // Check for missing fields (excluding _id and userId)
    const requiredFields = ["brand", "model", "year", "fuelType", "transmission", "kilometer", "owners", "color", "price", "negotiable", "insurance", "location", "sellerName", "contactNumber", "email"];
    if (requiredFields.some(field => !updateFields[field])) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    let car = await Car.findOne({ _id, userId });
    if (!car) return res.status(404).json({ status: false, message: "Car not found" });

    // Handle image update
    updateFields.image = car.image
    if (req.file) {
      const publicId = car.image?.split("/").slice(-2).join("/").split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "Car-Images", resource_type: "auto" });
      updateFields.image = uploadResult.secure_url;
    }

    // Update car details
    Object.assign(car, updateFields);
    await car.save();

    return res.json({ status: true, message: "Car Details Updated" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};



module.exports = { AddCar, GetCar, GetAllCars, GetCarDetails, EditCarDetails, GetCarByBrand, GetFeaturedCars };
