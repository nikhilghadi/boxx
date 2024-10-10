const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC methods to the renderer (React)
contextBridge.exposeInMainWorld('api', {
  saveEvent: (eventData) => ipcRenderer.invoke('save-event', eventData),
  getEvents: () => ipcRenderer.invoke('get-events'),
  deleteEvent: (event_id) => ipcRenderer.invoke('delete-event', event_id),
  getTeams: (event_id)=> ipcRenderer.invoke('get-teams',event_id),
  saveTeam: (teamData) => ipcRenderer.invoke('save-team', teamData),
  deleteTeam: (team_id) => ipcRenderer.invoke('delete-team', team_id),
});
