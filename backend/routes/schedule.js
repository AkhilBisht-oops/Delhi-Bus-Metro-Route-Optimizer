const express = require('express');

const router = express.Router();

// Placeholder for schedule routes
router.get('/:routeId', (req, res) => {
  res.json({ 
    message: 'Schedule endpoint - to be implemented',
    routeId: req.params.routeId 
  });
});

module.exports = router;