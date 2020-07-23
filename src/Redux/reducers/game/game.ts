import { createSlice } from "@reduxjs/toolkit";
import { GameState, GameStatus } from "./game-interfaces";
import { AppState, SLICE_IDENTIFIERS } from "../../AppState";

const SLICE_NAME = "game";

export const game = createSlice({
  name: SLICE_NAME,
  initialState: {
    gameStatus: GameStatus.Playing,
  },
  reducers: {
    loseGame: (state: GameState) => {
      state.gameStatus = GameStatus.Lost;
    },
  },
});

export const selectors = {
  gameWasLost: (state: AppState) => {
    return state[SLICE_IDENTIFIERS.GAME].gameStatus === GameStatus.Lost;
  },
  gameStatus: (state: AppState) => {
    return state[SLICE_IDENTIFIERS.GAME].gameStatus;
  },
};
