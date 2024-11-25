import { ipcMain } from 'electron';
import { saveDraw } from '../database/drawModel.mjs';
// IPC handler to create an draw
ipcMain.handle('save-draw', async (a,drawData) => {
  try {
    const result = await saveDraw(drawData);
    return result;
  } catch (error) {
    console.error('Error creating draw:', error);
    throw error;
  }
});
