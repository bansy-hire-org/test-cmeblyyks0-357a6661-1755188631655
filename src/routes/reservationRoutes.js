const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create a new reservation
router.post('/', authenticateToken, async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      userId: req.user.userId
    });
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation' });
  }
});

// Get reservations for a user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.user.userId }
    });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

module.exports = router;