import { BoardState } from "./reducers/board/board-interfaces";
import { GameState } from "./reducers/game/game-interfaces";

export enum SLICE_IDENTIFIERS {
  BOARD,
  GAME,
}

export interface AppState {
  [SLICE_IDENTIFIERS.BOARD]: BoardState;
  [SLICE_IDENTIFIERS.GAME]: GameState;
}
