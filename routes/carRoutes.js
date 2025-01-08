const express = require('express');
const router = express.Router();

// Get all cars
const getCars = async (pool) => {
  const res = await pool.query('SELECT * FROM cars');
  return res.rows;
};

// Get a single car by ID
const getCarById = async (pool, id) => {
  const res = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
  return res.rows[0];
};

// Add a review to a car
const addReview = async (pool, id, review) => {
  const { user, rating, comment } = review;
  await pool.query(
    'INSERT INTO reviews (car_id, user, rating, comment) VALUES ($1, $2, $3, $4)',
    [id, user, rating, comment]
  );
};

// Define routes
router.get('/', async (req, res) => {
  const cars = await getCars(req.pool);
  res.json(cars);
});

router.get('/:id', async (req, res) => {
  const car = await getCarById(req.pool, req.params.id);
  res.json(car);
});

router.post('/:id/reviews', async (req, res) => {
  await addReview(req.pool, req.params.id, req.body);
  res.status(201).send('Review added');
});

// Middleware to attach the pool to the request
router.use((req, res, next) => {
  req.pool = pool;
  next();
});

module.exports = (pool) => router;
