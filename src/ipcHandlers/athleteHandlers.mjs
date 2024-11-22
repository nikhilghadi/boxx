import { ipcMain } from 'electron';
import { createAthlete, getAllAthletes, destroyAthlete } from '../database/athleteModel.mjs';
ipcMain.handle("save-athlete", async (a, athlete) => {
  try {
    const savedAthlete = await createAthlete(athlete);
    return savedAthlete;
  } catch (error) {
    console.error(error);
    return null;
  }
});

ipcMain.handle("get-athletes", async (event,event_id,weight_class_id=null) => {
  try {
    const athletes = await getAllAthletes(event_id,weight_class_id);
    return athletes;
  } catch (error) {
    console.error(error);
    return null;
  }
})

ipcMain.handle("delete-athlete", async (event, athlete_id) => {
  try {
    const deletedAthlete = await destroyAthlete(athlete_id);
    return deletedAthlete;
  } catch (error) {
    console.error(error);
    return null;
  }
})