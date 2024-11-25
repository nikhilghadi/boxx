import {initDb} from './dbConnection.mjs';

// Draw model methods
export const saveDraw = async (drawData) => {
  const db = await initDb();
  // Insert draw data into the database
  console.log("saveDraw",drawData)
  const {event_id, weight_class_id, draws} = drawData
  let drawLength = draws.length;
  for (let i = 0; i < drawLength; i++) {
    const draw = draws[i];
    const {round_number} = draw 
    // console.log("Each draw",draw);
    let number_of_bouts = draw.matches.length;
    const {matches} = draw;
    for (let j = 0; j < number_of_bouts; j++) {
      const match = matches[j];
      
      // console.log("Each match",match);
      const {players, bout_number} = match
      // const drawResult = await db.run(
      //   'INSERT INTO draws (round_number,bout_number,event_id, weight_class_id, is_bout_complete) VALUES (?, ?, ?, ?, ?)',
      //   [round_number,bout_number, event_id, weight_class_id, false]
      // );
      const drawResult = await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO draws (round_number, bout_number, event_id, weight_class_id, is_bout_complete) VALUES (?, ?, ?, ?, ?)',
          [round_number, bout_number, event_id, weight_class_id, false],
          function (err) {
            if (err) return reject(err);
            resolve(this.lastID); // Retrieve the ID of the inserted row
          }
        );
      });
      console.log("Draw result",drawResult);
      const playersLength = players.length;
      for (let k = 0; k < playersLength; k++) {
        const player = players[k];
        
        console.log("Each player",player);
        const playerResult = await db.run(
          'INSERT INTO draw_entries (draw_id, athlete_id,position, is_winner) VALUES (?, ?, ?, ?)',
          [drawResult, player?.id, k, false]
        );
        console.log("Player result",playerResult);
      }
    }
    // const result = await db.run(
    //   'INSERT INTO draws (round_number,bout_number,event_id, weight_class_id, is_bout_complete) VALUES (?, ?, ?, ?, ?)',
    //   [round_number,bout_number, event_id, weight_class_id, false]
    // );
    console.log(`Draw ${i+1} inserted with ID: `);
  }
  return {};
};