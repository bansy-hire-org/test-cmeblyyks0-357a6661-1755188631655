const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Create a new restaurant (Admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
});

module.exports = router;