const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db/database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('login.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('register-user', async (event, userData) => {
  try {
    db.registerUser(userData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});


ipcMain.handle('reset-password', (event, { email, nombre, newPassword }) => {
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND nombre = ?').get(email, nombre);

  if (!user) {
    return { success: false, error: 'Email o nombre incorrecto' };
  }

  db.prepare('UPDATE users SET contrasena = ? WHERE email = ? AND nombre = ?')
    .run(newPassword, email, nombre);

  return { success: true };
});

