const mongoose = require("mongoose");

/**
 * Stop sub-schema (GeoJSON Point)
 */
const stopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sequence: {
      type: Number,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point", // ✅ default added (important)
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
  },
  { _id: false }
);

/**
 * Route schema
 */
const routeSchema = new mongoose.Schema(
  {
    routeNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["metro", "bus", "rapidTransit"],
      required: true,
    },

    line: {
      type: String,
      trim: true,
    },

    color: {
      type: String,
      default: "#000000",
    },

    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    stops: {
      type: [stopSchema],
      validate: [(v) => v.length > 0, "At least one stop is required"],
    },

    /**
     * Optional geometry for drawing route lines on map
     */
    geometry: {
      type: {
        type: String,
        enum: ["LineString"],
        default: "LineString",
      },
      coordinates: {
        type: [[Number]], // [[lng, lat]]
        default: [],
      },
    },

    operatingHours: {
      start: {
        type: String,
        default: "06:00",
      },
      end: {
        type: String,
        default: "23:00",
      },
    },

    frequency: {
      type: Number,
      default: 10, // minutes
    },

    fare: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* ✅ REQUIRED GEO INDEX (THIS FIXES YOUR ERROR) */
routeSchema.index({ "stops.location": "2dsphere" });

/* ✅ Optional performance index */
routeSchema.index({ type: 1, isActive: 1 });

module.exports = mongoose.model("Route", routeSchema);
