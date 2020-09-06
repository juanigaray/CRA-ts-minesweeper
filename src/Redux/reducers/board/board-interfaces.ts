export enum SquareContent {
  Nothing,
  Mine
}

export enum SquareState {
  Clicked,
  Unclicked,
  Flagged
}

export interface SquareIndex {
  iIndex: number;
  jIndex: number;
}

export interface Square {
  content: SquareContent;
  state: SquareState;
  surroundingBombs: number;
}

export type SquareRow = Array<Square>;

export type SquareMatrix = Array<SquareRow>;

export interface BoardState {
  squares: SquareMatrix;
}
