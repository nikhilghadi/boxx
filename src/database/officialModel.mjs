import {initDb} from './dbConnection.mjs';

// official model methods
export const createOfficial = async (officialData) => {
  const db = await initDb();
  console.log(officialData)
  const {id, first_name,last_name, status_in_bout, gender, dob, age, event_id } = officialData;
  if (!id) {  
  const result = await db.run(
    'INSERT INTO officials (first_name,last_name,status_in_bout,gender, dob, age, event_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [first_name,last_name,status_in_bout, gender, dob, age, event_id]
  );}
  else{
    const result = await db.run(
      'UPDATE officials SET first_name =?, last_name =?, status_in_bout =?, gender = ?, dob =? , age = ? WHERE id = ?',
      [first_name,last_name,status_in_bout, gender, dob, age, id]
    );
  }
  return result;
};

export const getAllOfficials = async (event_id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM officials where event_id = ' + event_id, [], (err, rows) => {
    if (err) {
      console.error('Error fetching officials:', err);
      reject(err);
    } else {
      console.log('officials:', rows);  // Log the fetched officials
      resolve(rows);  // Return the fetched rows
    }
  });
  })
};

export const destroyOfficial = async (id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => { 
    db.run('DELETE FROM officials WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting official:', err);
        reject(err);
      } else {
        console.log('official deleted successfully');
        resolve();
      }
    });
  });
};
