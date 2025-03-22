const express = require('express');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./users.db');


// Middleware to parse JSON bodies
app.use(express.json());

// Register Route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (row) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password before storing it
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Insert the new user into the database
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
  
        res.status(201).json({ message: 'User registered successfully!' });
      });
    });
  });