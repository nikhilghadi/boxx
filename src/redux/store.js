import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
const store = configureStore({
  reducer: {
    event: eventReducer, // Register the event reducer
  },
});

export default store;
