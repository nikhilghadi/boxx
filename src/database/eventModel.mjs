import {initDb} from './dbConnection.mjs';

// Event model methods
export const createEvent = async (eventData) => {
  const db = await initDb();
  const {id, name, subtitle, city, date, location } = eventData;
  if (!id) {
    const result = await db.run(
      'INSERT INTO events (name,subtitle,city, location, date) VALUES (?, ?, ?, ?, ?)',
      [name,subtitle, city, location, date]
    );
  }
  else{
    const result = await db.run(
      'UPDATE events SET name =?, subtitle =?, city =?, location =?, date =? WHERE id =?',
      [name,subtitle, city, location, date, id]
    );
  }
  return {};
};

export const getAllEvents = async () => {
  const db = await initDb();
  // const rows = await db.all('SELECT * FROM events');
  // console.log("rows",rows)
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) {
      console.error('Error fetching events:', err);
      reject(err);
    } else {
      // console.log('Events:', rows);  // Log the fetched events
      resolve(rows);  // Return the fetched rows
    }
  });
  })
  // return rows;
};

export const destroyEvent = async (id) => {
  const db = await initDb();
  const result = await db.run('DELETE FROM events WHERE id =?', [id]);
  return result;
};
