import { board, selectors } from "./board";
import { SquareIndex, SquareContent } from "./board-interfaces";
import { AppState } from "../../AppState";
import { loseGame } from "../game/events";

export const squareWasClicked = (index: SquareIndex) => async (
  dispatch: Function,
  getState: () => AppState
) => {
  dispatch(board.actions.clickSquare(index));
  const square = selectors.square(getState())(index);
  const hadBomb = square.content === SquareContent.Mine;
  if (hadBomb) dispatch(loseGame());
};

export const squareFlagWasToggled = (index: SquareIndex) => async (
  dispatch: Function
) => {
  dispatch(board.actions.toggleFlag(index));
};
