import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/Userslice';
import contactsReducer from './contacts/contactsSlice'
import contactsMiddleware from "./contacts/contactsMiddleware";
import UserMiddleware, { userLocalStorageMiddleware } from "./user/UserMiddleware";

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [contactsMiddleware, UserMiddleware, userLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch