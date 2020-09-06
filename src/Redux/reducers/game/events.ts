import { game } from "./game";
import { board } from "../board/board";
import {
  SquareMatrix,
  SquareContent,
  SquareState
} from "../board/board-interfaces";
import { selectors } from "./game";

export const loseGame = () => async (dispatch: Function) => {
  dispatch(game.actions.loseGame());
};

export const startOver = () => async (dispatch: Function) => {
  dispatch(game.actions.restartGame());
  dispatch(board.actions.restartBoard());
};

export const checkVictory = (board: SquareMatrix) => async (
  dispatch: Function,
  getState: Function
) => {
  const hasLost = selectors.gameWasLost(getState());
  if (hasLost) return;

  for (const squareRow of board) {
    for (const square of squareRow) {
      if (
        square.content === SquareContent.Nothing &&
        square.state !== SquareState.Clicked
      ) {
        return;
      }
    }
  }
  return dispatch(game.actions.winGame());
};
