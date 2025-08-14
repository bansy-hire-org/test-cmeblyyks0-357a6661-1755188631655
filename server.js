const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const restaurantRoutes = require('./src/routes/restaurantRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


sequelize.sync({ alter: false }) // Use alter: true carefully in development only
  .then(() => {
    console.log('Database connected.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});