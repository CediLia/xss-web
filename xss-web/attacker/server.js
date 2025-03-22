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

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Log incoming login request
  console.log('Login attempt for username:', username);

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      console.log('Invalid username:', username);
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the password using bcrypt
    if (bcrypt.compareSync(password, row.password)) {
      console.log('Login successful for user:', username);
      res.status(200).json({ message: 'Login successful!' });
    } else {
      console.log('Incorrect password for user:', username);
      res.status(400).json({ error: 'Invalid username or password' });
    }
  });
});

// Update User Route (example of how to update user details)
app.post('/update-user', (req, res) => {
  const oldUsername = 'testuser'; 
  const newUsername = 'Cedilia';
  const newPassword = 'XSSWEB';

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  // Update query
  const updateQuery = `
    UPDATE users
    SET username = ?, password = ?
    WHERE username = ?`;

  // Run the update
  db.run(updateQuery, [newUsername, hashedPassword, oldUsername], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update user' });
    }

    if (this.changes === 0) {
      return res.status(400).json({ error: 'User not found or not updated' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
