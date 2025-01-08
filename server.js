const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
});

app.use('/api/cars', carRoutes(pool));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
