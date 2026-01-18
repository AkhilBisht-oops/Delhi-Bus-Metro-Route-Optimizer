const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["metro", "bus", "rapidTransit"],
      required: true,
    },
    line: String,
    color: String,
    origin: String,
    destination: String,

    stops: [
      {
        name: { type: String, required: true },
        sequence: { type: Number, required: true },

        location: {
          type: {
            type: String,
            enum: ["Point"],
            required: true,
          },
          coordinates: {
            type: [Number], // [lng, lat]
            required: true,
          },
        },
      },
    ],

    geometry: {
      type: {
        type: String,
        enum: ["LineString"],
        default: "LineString",
      },
      coordinates: [[Number]],
    },

    operatingHours: {
      start: String,
      end: String,
    },

    frequency: Number,
    fare: {
      min: Number,
      max: Number,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ✅ THIS INDEX IS MANDATORY */
routeSchema.index({ "stops.location": "2dsphere" });

module.exports = mongoose.model("Route", routeSchema);
