import { configureStore, type Middleware } from "@reduxjs/toolkit";
import userReducer from './user/slice';

const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action);
  localStorage.setItem("__redux__user__", JSON.stringify(store.getState()));
}

const synchWithDatabaseMiddleware: Middleware = store => next => async action => {
  const { type, payload } = action;
  console.log({type, payload})
  console.log(store.getState())
  next(action);
  
  if (type === 'user/readUser') {
    //await getUser(payload); 
    console.log('logrado');
  }

}

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: [persistanceLocalStorageMiddleware, synchWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch