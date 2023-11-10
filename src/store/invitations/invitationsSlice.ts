import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TInvitationResponse } from "../../types";

const DEFAULT_STATE: TInvitationResponse[] = [];

const initialState: TInvitationResponse[] = (() => {
  const persistedState = localStorage.getItem("__invitations__");
  return persistedState ? JSON.parse(persistedState) : DEFAULT_STATE;
})();

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    addInvitation: (state, action: PayloadAction<TInvitationResponse>) => {
      state.push(action.payload);
    },
    updateInvitations: (_, action: PayloadAction<TInvitationResponse[]>) => {
      return action.payload;
    },
    editInvitation: (_state, action: PayloadAction<TInvitationResponse[]>) => {
      return action.payload;
    },
  },
});

export default invitationsSlice.reducer;

export const { addInvitation, editInvitation, updateInvitations } =
  invitationsSlice.actions;
