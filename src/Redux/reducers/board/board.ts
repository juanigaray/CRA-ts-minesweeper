import { createSlice } from "@reduxjs/toolkit";
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

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const getRandomSquare = (): Square => ({
  content: SquareContent.Nothing,
  state: randomEnum(SquareState),
});

const getRandomRow = (): SquareRow => {
  const arr: SquareRow = [];
  for (let i = 0; i < BOARD_DIMENSIONS.COLS; i++) {
    arr.push(getRandomSquare());
  }
  return arr;
};

const getRandomMatrix = (): SquareMatrix => {
  const matrix: SquareMatrix = [];
  for (let i = 0; i < BOARD_DIMENSIONS.ROWS; i++) {
    matrix.push(getRandomRow());
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
      squares[payload.iIndex][payload.jIndex].state = SquareState.Clicked;
      // TODO: Free surrounding squares if the square doesn't have a bomb
    },
    flagSquare: (state: BoardState, { payload }: { payload: SquareIndex }) => {
      const { squares } = state;
      // TODO
    },
  },
});

export const selectors = {
  board: (state: AppState) => {
    return state[SLICE_IDENTIFIERS.BOARD].squares;
  },
  square: (state: AppState) => (index: SquareIndex) =>
    state[SLICE_IDENTIFIERS.BOARD].squares[index.iIndex][index.jIndex],
};
