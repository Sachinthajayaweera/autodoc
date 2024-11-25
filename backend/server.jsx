require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Adds security-related HTTP headers

// MySQL Connection (Database Configuration)
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "200123704050A",
  connectionLimit: 10,
});

// Ensure the database and tables exist
const initializeDatabase = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err.message);
      return;
    }
    console.log("Connected to MySQL");

    // Create database if not exists
    connection.query(`CREATE DATABASE IF NOT EXISTS auto_doc`, (err) => {
      if (err) {
        console.error("Error creating database:", err.message);
        connection.release();
        return;
      }
      console.log("Database ensured: auto_doc");

      // Use the created database
      connection.changeUser({ database: "auto_doc" }, (err) => {
        if (err) {
          console.error("Error switching to database:", err.message);
          connection.release();
          return;
        }
        console.log("Using database: auto_doc");

        // Create 'users' table if not exists
        const createUsersTable = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          )`;
        connection.query(createUsersTable, (err) => {
          if (err) {
            console.error("Error creating users table:", err.message);
          } else {
            console.log("Table ensured: users");
          }
        });

        // Create 'services' table if not exists
        const createServicesTable = `
          CREATE TABLE IF NOT EXISTS services (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
          )`;
        connection.query(createServicesTable, (err) => {
          if (err) {
            console.error("Error creating services table:", err.message);
          } else {
            console.log("Table ensured: services");
          }
        });

        // Create 'reviews' table if not exists
        const createReviewsTable = `
          CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            icon VARCHAR(255),
            rating INT NOT NULL,
            comment TEXT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`;
        connection.query(createReviewsTable, (err) => {
          if (err) {
            console.error("Error creating reviews table:", err.message);
          } else {
            console.log("Table ensured: reviews");
          }
        });

        connection.release();
      });
    });
  });
};

// Initialize database and tables
initializeDatabase();



// Auth Middleware (authMiddleware.js)
const SECRET_KEY = "14625";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


// Services Routes
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/api/services", (req, res) => {
  const { name, price } = req.body;
  db.query("INSERT INTO services (name, price) VALUES (?, ?)", [name, price], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, name, price });
  });
});

app.put("/api/services/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  db.query("UPDATE services SET name = ?, price = ? WHERE id = ?", [name, price, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Service updated successfully." });
  });
});

app.delete("/api/services/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM services WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Service deleted successfully." });
  });
});









// User Controller (userController.js)
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Account created successfully!" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    }
  );
};

const getProfile = (req, res) => {
  const userId = req.user.id;

  db.query("SELECT id, name, email FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
};

const updateUser = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, userId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Profile updated successfully" });
    }
  );
};

const deleteUser = (req, res) => {
  const userId = req.user.id;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Account deleted successfully" });
  });
};

// Review Routes (server2.js)

// 1. Get all reviews
app.get("/api/reviews", (req, res) => {
  const sql = "SELECT * FROM reviews ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err.message);
      return res.status(500).json({ message: "Error fetching reviews" });
    }
    res.json(results);
  });
});

// 2. Add a review
app.post("/api/reviews", (req, res) => {
  const { name, icon, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ message: "Name, rating, and comment are required" });
  }
  const sql =
    "INSERT INTO reviews (name, icon, rating, comment, date) VALUES (?, ?, ?, ?, NOW())";
  db.query(sql, [name, icon, rating, comment], (err, result) => {
    if (err) {
      console.error("Error adding review:", err.message);
      return res.status(500).json({ message: "Error adding review" });
    }
    res.json({ id: result.insertId, name, icon, rating, comment, date: new Date() });
  });
});

// 3. Delete a review
app.delete("/api/reviews/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Review ID is required" });
  }

  const sql = "DELETE FROM reviews WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting review:", err.message);
      return res.status(500).json({ message: "Error deleting review" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully", id });
  });
});

// 4. Update a review
app.put("/api/reviews/:id", (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }
  const sql = "UPDATE reviews SET rating = ?, comment = ? WHERE id = ?";
  db.query(sql, [rating, comment, id], (err, result) => {
    if (err) {
      console.error("Error updating review:", err.message);
      return res.status(500).json({ message: "Error updating review" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review updated successfully" });
  });
});

// User Routes
const userRoutes = express.Router();

// User Signup Route
userRoutes.post("/signup", signup);

// User Login Route
userRoutes.post("/login", login);

// Get User Profile
userRoutes.get("/profile", authMiddleware, getProfile);

// Update User Profile
userRoutes.put("/profile", authMiddleware, updateUser);

// Delete User Account
userRoutes.delete("/profile", authMiddleware, deleteUser);

// Mount user routes
app.use("/api", userRoutes);

// Error handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
