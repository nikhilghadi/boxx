import { ipcMain } from 'electron';
import { createEvent, getAllEvents } from '../database/eventModel.mjs';

// IPC handler to create an event
ipcMain.handle('save-event', async (eventData) => {
  try {
    const result = await createEvent(eventData);
    return result;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
});

// IPC handler to get all events
ipcMain.handle('get-events', async () => {
  try {
    const events = await getAllEvents();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
});
