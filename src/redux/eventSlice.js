import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEvent: null, // Initially no event is selected
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    selectEvent: (state, action) => {
      console.log("first reducer")
      state.currentEvent = action.payload; // Update the current event
    },
    clearEvent: (state) => {
      console.log("second reducer")
      state.currentEvent = null; // Clear the event selection
    },
  },
});

// Export the actions to be used in components
export const { selectEvent, clearEvent } = eventSlice.actions;

// Export the reducer to be used in the store
export default eventSlice.reducer;
