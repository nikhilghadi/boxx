import { ipcMain } from 'electron';
import { createOfficial, getAllOfficials, destroyOfficial } from '../database/officialModel.mjs';
ipcMain.handle("save-official", async (a, official) => {
  try {
    const savedOfficial = await createOfficial(official);
    return savedOfficial;
  } catch (error) {
    console.error(error);
    return null;
  }
});

ipcMain.handle("get-officials", async (event,event_id) => {
  try {
    const officials = await getAllOfficials(event_id);
    return officials;
  } catch (error) {
    console.error(error);
    return null;
  }
})

ipcMain.handle("delete-official", async (event, official_id) => {
  try {
    const deletedofficial = await destroyOfficial(official_id);
    return deletedofficial;
  } catch (error) {
    console.error(error);
    return null;
  }
})