import { createSlice } from "@reduxjs/toolkit";
import { TEvent } from "../../types";

export const DEFAULT_EVENT_STATE: TEvent = {
  event_id: "",
  name: "",
  description: "",
  type: null,
  owner_id: "",
  imageUrl: "",
}

const initialState: TEvent = (() => {
	const persistedState = localStorage.getItem("__event__");
	return persistedState ? JSON.parse(persistedState) : DEFAULT_EVENT_STATE;
})();

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    editEvent: (_, action) => {
      return {
        ...action.payload,
      }
    }
  }
})

export const { editEvent } = eventSlice.actions;
export default eventSlice.reducer;