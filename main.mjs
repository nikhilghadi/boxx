import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';
import './src/ipcHandlers/eventHandlers.mjs'
import './src/ipcHandlers/teamHandlers.mjs'

import { readFileSync } from 'fs';
import {initDb} from './src/database/dbConnection.mjs';

// Manually set __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;
const createDatabase = async () => {
  try {
    const db = await initDb();
    const schemaPath = path.join(__dirname,  'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    // Execute the schema to create tables
    await db.exec(schema);
    console.log('Database and tables created successfully.');
  } catch (error) {
    console.error('Error creating database:', error);
  }
};
// async function createDatabase() {
//   db = new sqlite3.Database(path.join(__dirname, 'mydatabase.db'));

//   db.prepare(`
//     CREATE TABLE IF NOT EXISTS events (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       subtitle TEXT,
//       city TEXT,
//       location TEXT,
//       date date,
//       tournament_organisation_auto boolean,
//       symmetrical_draw boolean,
//       number_of_rounds INTEGER,
//       rest_time INTEGER,
//       num_of_judges INTEGER
//     )
//   `).run();
// }

let mainWindow;

function createWindow() {
  console.log(__dirname)
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'dist/index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));
}

app.whenReady().then(async () => {
  await createDatabase(); // Initialize database when ready
  createWindow();
});


app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit();
    const db = await initDb();
    db.close();

  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
