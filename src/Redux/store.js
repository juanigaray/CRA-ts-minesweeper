import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { board } from "./reducers/board/board";
import { SLICE_IDENTIFIERS } from "./AppState";

export const store = configureStore({
  reducer: combineReducers({ [SLICE_IDENTIFIERS.BOARD]: board.reducer }),
});
