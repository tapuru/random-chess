import { GameModes } from "@/shared/types/game-modes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchGameState {
  activeMode: GameModes | null;
}

const initialState: SearchGameState = {
  activeMode: GameModes.CLASSICAL,
};

const searchGameSlice = createSlice({
  name: "searchGame",
  initialState,
  reducers: {
    setActiveMode(state, action: PayloadAction<GameModes>) {
      state.activeMode = action.payload;
    },
  },
});

const selectActiveMode = (state: RootState) => state.searchGame.activeMode;

export const searchGameReducer = searchGameSlice.reducer;

export const searchGameModel = {
  ...searchGameSlice.actions,
  selectActiveMode,
};
