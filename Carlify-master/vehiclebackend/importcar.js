
require("dotenv").config();

const mongoose = require("mongoose");
const Car = require("./model/carSchema");

const API_URL =
  "https://carlify-malviyarohitttt.onrender.com/api/v1/car/getallcars";

async function importCars() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL missing in .env");
    }

    // Connect to your own MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Your MongoDB connected!");

    // Fetch existing public car listings
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Source API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.status || !Array.isArray(result.carData)) {
      throw new Error("Invalid car API response");
    }

    const existingCount = await Car.countDocuments();

    if (existingCount > 0) {
      console.log(
        `Your database already has ${existingCount} cars. Import stopped to avoid duplicates.`
      );
      return;
    }

    // Prepare listings for your own database
    const cars = result.carData.map((car) => ({
      brand: car.brand,
      model: car.model,
      year: String(car.year),
      fuelType: car.fuelType,
      transmission: car.transmission,
      kilometer: car.kilometer,
      owners: car.owners,
      color: car.color,
      price: car.price,
      negotiable: car.negotiable,
      insurance: car.insurance,
      location: car.location,

      // Seller contact details are not copied
      userId: "imported-public-listing",
      sellerName: "Imported Listing",
      contactNumber: 0,
      email: "not-provided@example.invalid",

      // Preserve the existing image URL
      image: car.image,

      views: car.views || 0,
      Featured: car.Featured || false,
      createdAt: car.createdAt
        ? new Date(car.createdAt)
        : new Date(),
      updatedAt: car.updatedAt
        ? new Date(car.updatedAt)
        : new Date()
    }));

    const inserted = await Car.insertMany(cars);

    console.log(`${inserted.length} cars imported successfully!`);
  } catch (error) {
    console.error("Import failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

importCars();
