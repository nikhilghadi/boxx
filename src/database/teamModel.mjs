import {initDb} from './dbConnection.mjs';

// team model methods
export const createTeam = async (teamData) => {
  const db = await initDb();
  console.log(teamData)
  const {id, code,name, nation, head_coach, event_id } = teamData;
  if (!id) {  
  const result = await db.run(
    'INSERT INTO teams (code,name,nation,head_coach, event_id) VALUES (?, ?, ?, ?, ?)',
    [code,name,nation, head_coach, event_id]
  );}
  else{
    const result = await db.run(
      'UPDATE teams SET code =?, name =?, nation =?, head_coach = ? WHERE id = ?',
      [code,name,nation, head_coach, id]
    );
  }
  return result;
};

export const getAllTeams = async (event_id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM teams where event_id = ' + event_id, [], (err, rows) => {
    if (err) {
      console.error('Error fetching teams:', err);
      reject(err);
    } else {
      console.log('teams:', rows);  // Log the fetched teams
      resolve(rows);  // Return the fetched rows
    }
  });
  })
};

export const destroyTeam = async (id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => { 
    db.run('DELETE FROM teams WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting team:', err);
        reject(err);
      } else {
        console.log('Team deleted successfully');
        resolve();
      }
    });
  });
};
