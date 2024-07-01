import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CreateGameState {
  isWithTime: boolean;
  isWithTimeIncrement: boolean;
}

const initialState: CreateGameState = {
  isWithTime: false,
  isWithTimeIncrement: false,
};

export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    setIsWithTime: (state, action: PayloadAction<boolean>) => {
      state.isWithTime = action.payload;
    },
    setIsWithTimeIncrement: (state, action: PayloadAction<boolean>) => {
      state.isWithTimeIncrement = action.payload;
    },
  },
  selectors: {
    selectIsWithTime: (state) => state.isWithTime,
    selectIsWithTimeIncrement: (state) => state.isWithTimeIncrement,
  },
});

export const createGameModel = {
  ...createGameSlice.actions,
  ...createGameSlice.selectors,
};

export const createGameReducer = createGameSlice.reducer;
