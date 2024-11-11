import { initDb } from "./dbConnection.mjs";

export const createWeightClassTable = async (weightData) => {
  const db = await initDb();
  console.log(weightData)
  const {id, label,class_name, age_group, gender, event_id } = weightData;
  if (!id) {  
  const result = await db.run(
    'INSERT INTO weight_classes (label,class_name,age_group,gender, event_id) VALUES (?, ?, ?, ?, ?)',
    [label,class_name,age_group, gender, event_id]
  );}
  else{
    const result = await db.run(
      'UPDATE weight_classes SET label =?, class_name =?, age_group =?, gender = ? WHERE id = ?',
      [label,class_name,age_group, gender, id]
    );
  }

};



export const getAllWeightClasses = async (event_id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM weight_classes where event_id = ' + event_id, [], (err, rows) => {
    if (err) {
      console.error('Error fetching weightClasses:', err);
      reject(err);
    } else {
      console.log('weightClasses:', rows);  // Log the fetched weightClasses
      resolve(rows);  // Return the fetched rows
    }
  });
  })
};

export const destroyWeightClass = async (id) => {
  const db = await initDb();
  return new Promise((resolve, reject) => { 
    db.run('DELETE FROM weight_classes WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting WeightClass:', err);
        reject(err);
      } else {
        console.log('WeightClass deleted successfully');
        resolve();
      }
    });
  });
};
