// dbConnection.mjs
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import sqlite3 from'sqlite3';


export const initDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("mydatabase.db", (err) => {
      if (err) {
        console.error('Error opening database', err);
        reject(err);
      } else {
        console.log('Connected to the database.');
        resolve(db);
      }
    });
  });
};
