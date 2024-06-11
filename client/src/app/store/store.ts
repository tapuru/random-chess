import { boardReducer } from "@/entities/chess-board";
import { gameReducer } from "@/entities/game";
import { playersReducer } from "@/entities/player";
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
import storage from "redux-persist/lib/storage";

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

const rootReducer = combineReducers({
  board: persistReducer(boardPersistConfig, boardReducer),
  game: persistReducer(gamePersistConfig, gameReducer),
  players: persistReducer(playersPersistConfig, playersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
