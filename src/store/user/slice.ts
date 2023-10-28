import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  id: "",
  email: "",
  name: "",
  lastName: "",
  password: "",
  username: "",
  roles: []
}

const persistedState = localStorage.getItem("__redux__user__");
const initialState = persistedState ? JSON.parse(persistedState) : DEFAULT_STATE;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editUser: (state, action) => {
      return {
        ...action.payload,
      }
    }
  }
})

export const { editUser } = userSlice.actions;
export default userSlice.reducer;