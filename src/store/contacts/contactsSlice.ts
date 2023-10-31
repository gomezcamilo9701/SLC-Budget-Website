import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IUserWithId } from "../../types";

const DEFAULT_STATE: IUserWithId[] = [];


const initialState: IUserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		createContact: (state, action: PayloadAction<IUserWithId>) => {
			state.push(action.payload);
		},
		deleteContactById: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackContact: (state, action: PayloadAction<IUserWithId>) => {
			const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
			if (!isUserAlreadyDefined) {
				state.push(action.payload)
			}
		},
    updateContacts: (state, action: PayloadAction<IUserWithId[]>) => {
      return action.payload;
    },
	},
});

export default contactsSlice.reducer;

export const { createContact, deleteContactById, rollbackContact, updateContacts } = contactsSlice.actions;