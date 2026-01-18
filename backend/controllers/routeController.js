const Route = require("../models/Route");

/**
 * @desc    Get all routes with optional filters
 * @route   GET /api/routes
 */
exports.getAllRoutes = async (req, res) => {
  try {
    const { type, isActive, sort = "routeNumber" } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const routes = await Route.find(filter).sort(sort);

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch routes",
      error: error.message,
    });
  }
};

/**
 * @desc    Get single route by ID
 * @route   GET /api/routes/:id
 */
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch route",
      error: error.message,
    });
  }
};

/**
 * @desc    Get routes by type
 * @route   GET /api/routes/type/:type
 */
exports.getRoutesByType = async (req, res) => {
  try {
    const { type } = req.params;

    const allowedTypes = ["metro", "bus", "airport"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid route type",
      });
    }

    const routes = await Route.find({
      type,
      isActive: true,
    }).sort({ routeNumber: 1 });

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch routes by type",
      error: error.message,
    });
  }
};

/**
 * @desc    Get nearby routes using geo location
 * @route   GET /api/routes/nearby
 */
exports.getNearbyRoutes = async (req, res) => {
  try {
    const { lat, lng, radius = 1000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude required",
      });
    }

    const routes = await Route.find({
      "stops.location": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(radius),
        },
      },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch nearby routes",
      error: error.message,
    });
  }
};

/**
 * @desc    Search routes
 * @route   GET /api/routes/search?q=
 */
exports.searchRoutes = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const routes = await Route.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { routeNumber: { $regex: q, $options: "i" } },
            { name: { $regex: q, $options: "i" } },
            { origin: { $regex: q, $options: "i" } },
            { destination: { $regex: q, $options: "i" } },
            { "stops.name": { $regex: q, $options: "i" } },
          ],
        },
      ],
    }).limit(20);

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};
