const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Create the 'users' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
});

console.log('SQLite database setup complete!');
