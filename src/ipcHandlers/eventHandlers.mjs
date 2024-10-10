import { ipcMain } from 'electron';
import { createEvent, getAllEvents, destroyEvent } from '../database/eventModel.mjs';

// IPC handler to create an event
ipcMain.handle('save-event', async (a,eventData) => {
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

ipcMain.handle('delete-event', async (a,eventId) => {
  try {
    const result = await destroyEvent(eventId);
    return result;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
});
