const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC methods to the renderer (React)
contextBridge.exposeInMainWorld('api', {
  saveEvent: (eventData) => ipcRenderer.invoke('save-event', eventData),
  getEvents: () => ipcRenderer.invoke('get-events'),
  deleteEvent: (event_id) => ipcRenderer.invoke('delete-event', event_id),
  getTeams: (event_id)=> ipcRenderer.invoke('get-teams',event_id),
  saveTeam: (teamData) => ipcRenderer.invoke('save-team', teamData),
  deleteTeam: (team_id) => ipcRenderer.invoke('delete-team', team_id),
  getWeightClasses: (event_id)=> ipcRenderer.invoke('get-weight-classes',event_id),
  saveWeightClass: (WeightClassData) => ipcRenderer.invoke('save-weight-class', WeightClassData),
  deleteWeightClass: (weight_class_id) => ipcRenderer.invoke('delete-weight-class', weight_class_id),
  getAthletes: (event_id, weight_class_id = null)=> ipcRenderer.invoke('get-athletes',event_id, weight_class_id),
  saveAthlete: (athleteData) => ipcRenderer.invoke('save-athlete', athleteData),
  deleteAthlete: (athelete_id) => ipcRenderer.invoke('delete-athlete', athelete_id),
  getOfficials: (event_id)=> ipcRenderer.invoke('get-officials',event_id),
  saveOfficial: (officialData) => ipcRenderer.invoke('save-official', officialData),
  deleteOfficial: (official_id) => ipcRenderer.invoke('delete-official', official_id),
  saveDraw: (drawData) => ipcRenderer.invoke('save-draw', drawData),
});
