import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/Userslice';
import contactsReducer from './contacts/contactsSlice'
import authReducer from './auth/authSlice'
import contactsMiddleware from "./contacts/contactsMiddleware";
import { userLocalStorageMiddleware } from "./user/UserMiddleware";
import authLocalStorageMiddleware from "./auth/authMiddleware";

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  auth: authReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [contactsMiddleware, userLocalStorageMiddleware, authLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch