import { boardReducer } from "@/entities/chess-board";
import { gameReducer } from "@/entities/game";
import { playersReducer } from "@/entities/player";
import { userReducer } from "@/entities/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  board: boardReducer,
  game: gameReducer,
  players: playersReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
