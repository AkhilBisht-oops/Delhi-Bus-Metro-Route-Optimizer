const express = require("express");
const {
  getAllRoutes,
  getRouteById,
  getRoutesByType,
  getNearbyRoutes,
  searchRoutes,
} = require("../controllers/routeController");

const router = express.Router();

/**
 * @route   GET /api/routes
 * @desc    Get all routes (filters supported)
 */
router.get("/", getAllRoutes);

/**
 * @route   GET /api/routes/search?q=
 * @desc    Search routes by keyword
 */
router.get("/search", searchRoutes);

/**
 * @route   GET /api/routes/nearby?lat=&lng=&radius=
 * @desc    Get nearby routes using geo query
 */
router.get("/nearby", getNearbyRoutes);

/**
 * @route   GET /api/routes/type/:type
 * @desc    Get routes by type (metro | bus | airport)
 */
router.get("/type/:type", getRoutesByType);

/**
 * @route   GET /api/routes/:id
 * @desc    Get route by ID
 */
router.get("/:id", getRouteById);

module.exports = router;
