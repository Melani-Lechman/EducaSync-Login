const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'users.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
`);

function registerUser({ email, password }) {
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  stmt.run(email, password);
}

function resetPassword(email, newPassword) {
  const stmt = db.prepare('UPDATE users SET password = ? WHERE email = ?');
  stmt.run(newPassword, email);
}

module.exports = {
  registerUser,
  resetPassword
};
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    contrasena TEXT NOT NULL
  );
`);
