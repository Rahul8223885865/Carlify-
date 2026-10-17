const mongoose = require("mongoose"); // Erase if already required

var carSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    kilometer: {
      type: Number,
      required: true,
    },
    owners: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    negotiable: {
      type: String,
      required: true,
    },
    insurance: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    views: { type: Number, default: 0 },
    Featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Car", carSchema);
