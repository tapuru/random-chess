import { gameReducer } from "@/entities/game";
import { roomReducer } from "@/features/room";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  room: roomReducer,
  game: gameReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
