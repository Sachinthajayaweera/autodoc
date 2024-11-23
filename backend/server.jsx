const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cpktnwt45@2665',
  database: 'reviews_db',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Check database connection for each request
app.use((req, res, next) => {
  if (!db) {
    return res.status(500).json({ message: 'Database connection failed' });
  }
  next();
});

// Routes

// 1. Get all reviews
app.get('/api/reviews', (req, res) => {
  const sql = 'SELECT * FROM reviews ORDER BY date DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      return res.status(500).json({ message: 'Error fetching reviews' });
    }
    res.json(results);
  });
});

// 2. Add a review
app.post('/api/reviews', (req, res) => {
  const { name, icon, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ message: 'Name, rating, and comment are required' });
  }
  const sql = 'INSERT INTO reviews (name, icon, rating, comment, date) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [name, icon, rating, comment], (err, result) => {
    if (err) {
      console.error('Error adding review:', err.message);
      return res.status(500).json({ message: 'Error adding review' });
    }
    res.json({ id: result.insertId, name, icon, rating, comment, date: new Date() });
  });
});


// 3. Delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Review ID is required' });
  }

  const sql = 'DELETE FROM reviews WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting review:', err.message);
      return res.status(500).json({ message: 'Error deleting review' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully', id });
  });
});

// 4. Update a review
app.put('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: 'Rating and comment are required' });
  }
  const sql = 'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?';
  db.query(sql, [rating, comment, id], (err, result) => {
    if (err) {
      console.error('Error updating review:', err.message);
      return res.status(500).json({ message: 'Error updating review' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review updated successfully' });
  });
});

// Error handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


