const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC methods to the renderer (React)
contextBridge.exposeInMainWorld('api', {
  saveEvent: (eventData) => ipcRenderer.invoke('save-event', eventData),
  getEvents: () => ipcRenderer.invoke('get-events')
});
