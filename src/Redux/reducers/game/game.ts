import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "./game-interfaces";
import { AppState, SLICE_IDENTIFIERS } from "../../AppState";

const SLICE_NAME = "game";

export const game = createSlice({
  name: SLICE_NAME,
  initialState: {
    gameWasLost: false,
  },
  reducers: {
    loseGame: (state: GameState) => {
      state.gameWasLost = true;
    },
  },
});

export const selectors = {
  gameWasLost: (state: AppState) => {
    return state[SLICE_IDENTIFIERS.GAME].gameWasLost;
  },
};
