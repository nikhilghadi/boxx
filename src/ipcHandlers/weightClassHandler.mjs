import { ipcMain } from 'electron';
import { createWeightClassTable, getAllWeightClasses, destroyWeightClass } from '../database/weightClassModel.mjs';

ipcMain.handle("save-weight-class", async (a, weight) => {
  try {
    const savedWeight = await createWeightClassTable(weight);
    return savedWeight;
  } catch (error) {
    console.error(error);
    return null;
  }
});

ipcMain.handle("get-weight-classes", async (event,event_id) => {
  try {
    const weights = await getAllWeightClasses(event_id);
    return weights;
  } catch (error) {
    console.error(error);
    return null;
  }
})

ipcMain.handle("delete-weight-class", async (event, weight_id) => {
  try {
    const deletedWeight = await destroyWeightClass(weight_id);
    return deletedWeight;
  } catch (error) {
    console.error(error);
    return null;
  }
})