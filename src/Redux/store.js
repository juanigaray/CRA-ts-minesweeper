import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { board } from "./reducers/board/board";
import { SLICE_IDENTIFIERS } from "./AppState";
import { game } from "./reducers/game/game";

export const store = configureStore({
  reducer: combineReducers({
    [SLICE_IDENTIFIERS.BOARD]: board.reducer,
    [SLICE_IDENTIFIERS.GAME]: game.reducer
  })
});
