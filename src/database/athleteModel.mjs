import {initDb} from './dbConnection.mjs';

// Athlete model methods
export const createAthlete = async (athleteData) => {
  const db = await initDb();
  console.log(athleteData)
  const {id, first_name,last_name, dob,age, gender,weight,height,hand,weight_class_id,team_id, event_id } = athleteData;
  if (!id) {  
  const result = await db.run(
    'INSERT INTO athletes (first_name,last_name, dob,age, gender,weight,height,hand,weight_class_id,team_id, event_id) VALUES (?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?)',
    [first_name,last_name, dob,age, gender,weight,height,hand,weight_class_id,team_id, event_id]
  );}
  else{
    const result = await db.run(
      'UPDATE athletes SET first_name =?, last_name =?, dob =?, age = ?, gender = ?, weight = ?, height = ?, hand = ?, weight_class_id =? , team_id = ? WHERE id = ?',
      [first_name,last_name, dob,age, gender,weight,height,hand,weight_class_id,team_id, id]
    );
  }
  // return result;
};

export const getAllAthletes = async (event_id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    db.all(`select athletes.*, weight_classes.label as weight_class, teams.name as team_name
  from (select * from athletes where athletes.event_id = ${event_id} ) as athletes left join
 weight_classes on athletes.weight_class_id = weight_classes.id
 left join teams on athletes.team_id = teams.id `, [], (err, rows) => {
    if (err) {
      console.error('Error fetching Athletes:', err);
      reject(err);
    } else {
      console.log('Athletes:', rows);  // Log the fetched Athletes
      resolve(rows);  // Return the fetched rows
    }
  });
  })
};

export const destroyAthlete = async (id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => { 
    db.run('DELETE FROM athletes WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting Athlete:', err);
        reject(err);
      } else {
        console.log('Athlete deleted successfully');
        resolve();
      }
    });
  });
};
