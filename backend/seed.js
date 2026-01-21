const dotenv = require("dotenv");
const Route = require("./models/Route");
const { connectDatabase } = require("./db/database");

dotenv.config();

/* 🔹 Helper to create GeoJSON stop */
const stop = (name, lat, lng, sequence) => ({
  name,
  sequence,
  location: {
    type: "Point",
    coordinates: [lng, lat], // IMPORTANT: [lng, lat]
  },
});

const sampleRoutes = [
  {
    routeNumber: "RED",
    name: "Rithala - Shaheed Sthal (New Bus Adda)",
    type: "metro",
    line: "Red Line",
    color: "#FF0000",
    origin: "Rithala",
    destination: "Shaheed Sthal",
    stops: [
      stop("Rithala", 28.7233, 77.1011, 1),
      stop("Rohini Sector 18-19", 28.7045, 77.1184, 2),
      stop("Haiderpur Badli Mor", 28.7276, 77.1497, 3),
      stop("Jahangirpuri", 28.7291, 77.1639, 4),
      stop("Kashmere Gate", 28.6672, 77.2270, 5),
      stop("Chandni Chowk", 28.6580, 77.2304, 6),
      stop("New Delhi", 28.6431, 77.2197, 7),
      stop("Rajiv Chowk", 28.6328, 77.2197, 8),
      stop("Welcome", 28.6710, 77.2766, 9),
      stop("Dilshad Garden", 28.6817, 77.3187, 10),
    ],
    geometry: {
      type: "LineString",
      coordinates: [
        [77.1011, 28.7233],
        [77.1184, 28.7045],
        [77.1497, 28.7276],
        [77.1639, 28.7291],
        [77.2270, 28.6672],
        [77.2304, 28.6580],
        [77.2197, 28.6431],
        [77.2197, 28.6328],
        [77.2766, 28.6710],
        [77.3187, 28.6817],
      ],
    },
    operatingHours: { start: "06:00", end: "23:00" },
    frequency: 5,
    fare: { min: 10, max: 60 },
    isActive: true,
  },

  {
    routeNumber: "BLUE",
    name: "Dwarka Sector 21 - Noida Electronic City",
    type: "metro",
    line: "Blue Line",
    color: "#0000FF",
    origin: "Dwarka Sector 21",
    destination: "Noida Electronic City",
    stops: [
      stop("Dwarka Sector 21", 28.5529, 77.0583, 1),
      stop("Dwarka Sector 8", 28.5710, 77.0726, 2),
      stop("Rajouri Garden", 28.6410, 77.1208, 3),
      stop("Karol Bagh", 28.6514, 77.1906, 4),
      stop("Rajiv Chowk", 28.6328, 77.2197, 5),
      stop("Mandi House", 28.6265, 77.2343, 6),
      stop("Yamuna Bank", 28.6402, 77.2823, 7),
      stop("Noida City Centre", 28.5747, 77.3560, 8),
      stop("Noida Electronic City", 28.5709, 77.3655, 9),
    ],
    geometry: {
      type: "LineString",
      coordinates: [
        [77.0583, 28.5529],
        [77.0726, 28.5710],
        [77.1208, 28.6410],
        [77.1906, 28.6514],
        [77.2197, 28.6328],
        [77.2343, 28.6265],
        [77.2823, 28.6402],
        [77.3560, 28.5747],
        [77.3655, 28.5709],
      ],
    },
    operatingHours: { start: "06:00", end: "23:00" },
    frequency: 4,
    fare: { min: 10, max: 60 },
    isActive: true,
  },

  {
    routeNumber: "543",
    name: "ISBT Kashmere Gate - Rohini Sector 24",
    type: "bus",
    color: "#32CD32",
    origin: "ISBT Kashmere Gate",
    destination: "Rohini Sector 24",
    stops: [
      stop("ISBT Kashmere Gate", 28.6677, 77.2281, 1),
      stop("Tis Hazari Court", 28.6733, 77.2161, 2),
      stop("Azadpur", 28.7041, 77.1753, 3),
      stop("Rohini Sector 24", 28.7412, 77.1110, 4),
    ],
    location: {
    type: "Point",
    coordinates: [77.2197, 28.6328]
  },
    operatingHours: { start: "05:30", end: "23:30" },
    frequency: 15,
    fare: { min: 5, max: 25 },
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDatabase();

    console.log("🗑️ Clearing existing routes...");
    await Route.deleteMany({});

    console.log("📦 Seeding database...");
    await Route.insertMany(sampleRoutes);

    console.log(`✅ Seeded ${sampleRoutes.length} routes successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
