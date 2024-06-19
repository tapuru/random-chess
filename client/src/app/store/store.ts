import { authReducer } from "@/entities/auth";
import { boardReducer } from "@/entities/chess-board";
import { gameReducer } from "@/entities/game";
import { playersReducer } from "@/entities/player";
import { apiSlice } from "@/shared/api/api-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  board: boardReducer,
  game: gameReducer,
  players: playersReducer,
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
