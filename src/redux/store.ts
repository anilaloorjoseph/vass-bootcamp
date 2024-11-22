import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import task from "./slices/taskSlice";
import auth from "./slices/authSlice";
import group from "./slices/groupSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = persistReducer(
  persistConfig,
  combineReducers({ auth, user, task, group })
);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
