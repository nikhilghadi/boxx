import { ipcMain } from 'electron';
import { createTeam, getAllTeams, destroyTeam } from '../database/teamModel.mjs';

ipcMain.handle("save-team", async (a, team) => {
  try {
    const savedTeam = await createTeam(team);
    return savedTeam;
  } catch (error) {
    console.error(error);
    return null;
  }
});

ipcMain.handle("get-teams", async (event,event_id) => {
  try {
    const teams = await getAllTeams(event_id);
    return teams;
  } catch (error) {
    console.error(error);
    return null;
  }
})

ipcMain.handle("delete-team", async (event, team_id) => {
  try {
    const deletedTeam = await destroyTeam(team_id);
    return deletedTeam;
  } catch (error) {
    console.error(error);
    return null;
  }
})