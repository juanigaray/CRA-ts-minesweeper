import { BoardState } from "./reducers/board/board-interfaces";

export enum SLICE_IDENTIFIERS {
  BOARD,
}

export interface AppState {
  [SLICE_IDENTIFIERS.BOARD]: BoardState;
}
