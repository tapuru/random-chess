import { authReducer } from "@/entities/auth";
import { boardReducer } from "@/entities/chess-board";
import { gameReducer } from "@/entities/game";
import { playersReducer } from "@/entities/player";
import { apiSlice } from "@/shared/api/api-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
const gamePersistConfig = {
  key: "game",
  storage: storage,
};

const boardPersistConfig = {
  key: "board",
  storage: storage,
};

const playersPersistConfig = {
  key: "players",
  storage: storage,
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const rootReducer = combineReducers({
  board: persistReducer(boardPersistConfig, boardReducer),
  game: persistReducer(gamePersistConfig, gameReducer),
  players: persistReducer(playersPersistConfig, playersReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
