import { createSlice } from "@reduxjs/toolkit";
import shuffle from "lodash.shuffle";
import {
  SquareMatrix,
  BoardState,
  SquareIndex,
  SquareState,
  SquareContent,
  Square,
  SquareRow,
} from "./board-interfaces";
import { BOARD_DIMENSIONS } from "../../../Constants/BoardDimensions";
import { AppState, SLICE_IDENTIFIERS } from "../../AppState";

const getInitialSquare = () => ({
  content: SquareContent.Nothing,
  state: SquareState.Unclicked,
});

const getRandomMatrix = (): SquareMatrix => {
  let allSquares: Array<Square> = [];
  for (let i = 0; i < BOARD_DIMENSIONS.ROWS * BOARD_DIMENSIONS.COLS; i++) {
    allSquares.push(getInitialSquare());
  }
  for (let j = 0; j < BOARD_DIMENSIONS.TOTAL_MINES; j++) {
    allSquares[j].content = SquareContent.Mine;
  }
  allSquares = shuffle(allSquares);
  const matrix: SquareMatrix = [];
  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    const arr: SquareRow = [];
    for (let j = 0; j < BOARD_DIMENSIONS.COLS; j++) {
      arr.push(allSquares.pop() as Square);
    }
    matrix.push(arr);
  }
  return matrix;
};

const SLICE_NAME = "board";

export const board = createSlice({
  name: SLICE_NAME,
  initialState: {
    squares: getRandomMatrix(),
  },
  reducers: {
    clickSquare: (state: BoardState, { payload }: { payload: SquareIndex }) => {
      const { squares } = state;
      const square = squares[payload.iIndex][payload.jIndex];
      if (square.state !== SquareState.Flagged)
        square.state = SquareState.Clicked;
      // TODO: Free surrounding squares if the square doesn't have a bomb
    },
    toggleFlag: (state: BoardState, { payload }: { payload: SquareIndex }) => {
      const { squares } = state;
      const square = squares[payload.iIndex][payload.jIndex];
      if (square.state === SquareState.Flagged) {
        square.state = SquareState.Unclicked;
      } else if (square.state === SquareState.Unclicked) {
        square.state = SquareState.Flagged;
      }
    },
  },
});

const isValidSquareIndex = ({ i, j }: { i: number; j: number }): boolean => {
  return (
    i >= 0 && j >= 0 && i < BOARD_DIMENSIONS.ROWS && j < BOARD_DIMENSIONS.COLS
  );
};

const getMinesAroundSquare = (state: AppState) => (
  index: SquareIndex
): number => {
  const board = state[SLICE_IDENTIFIERS.BOARD].squares;
  let minesAmount = 0;
  for (let i: number = -1; i < 2; i++) {
    for (let j: number = -1; j < 2; j++) {
      if (isValidSquareIndex({ i: index.iIndex + i, j: index.jIndex + j })) {
        const square = board[index.iIndex + i][index.jIndex + j];
        if (square.content === SquareContent.Mine) {
          minesAmount++;
        }
      }
    }
  }
  return minesAmount;
};

export const selectors = {
  board: (state: AppState) => {
    return state[SLICE_IDENTIFIERS.BOARD].squares;
  },
  square: (state: AppState) => (index: SquareIndex) =>
    state[SLICE_IDENTIFIERS.BOARD].squares[index.iIndex][index.jIndex],
  minesAroundSquare: (state: AppState) => getMinesAroundSquare(state),
};
