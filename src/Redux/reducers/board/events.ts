import { board, selectors } from "./board";
import { SquareIndex, SquareContent, SquareState } from "./board-interfaces";
import { AppState } from "../../AppState";
import { loseGame, checkVictory } from "../game/events";

export const squareWasClicked = (index: SquareIndex) => async (
  dispatch: Function,
  getState: () => AppState
) => {
  const square = selectors.square(getState())(index);
  const hasFlag = square.state === SquareState.Flagged;
  if (hasFlag) return;
  dispatch(board.actions.clickSquare(index));
  const hadBomb = square.content === SquareContent.Mine;
  if (hadBomb) dispatch(loseGame());
  const squareMatrix = selectors.board(getState());
  dispatch(checkVictory(squareMatrix));
};

export const squareFlagWasToggled = (index: SquareIndex) => async (
  dispatch: Function
) => {
  dispatch(board.actions.toggleFlag(index));
};
