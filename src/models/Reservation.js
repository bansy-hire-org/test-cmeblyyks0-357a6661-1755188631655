const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Restaurant = require('./Restaurant');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  numberOfGuests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'reservations',
  timestamps: true,
  underscored: true
});

Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });

module.exports = Reservation;