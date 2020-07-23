import { game } from "./game";
import {
  SquareMatrix,
  SquareContent,
  SquareState,
} from "../board/board-interfaces";
import { selectors } from "./game";

export const loseGame = () => async (dispatch: Function) => {
  dispatch(game.actions.loseGame());
};

export const startOver = () => async () => {
  // todo
  return null;
};

export const checkVictory = (board: SquareMatrix) => async (
  dispatch: Function,
  getState: Function
) => {
  const hasLost = selectors.gameWasLost(getState());
  if (hasLost) return;

  for (let squareRow of board) {
    for (let square of squareRow) {
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
