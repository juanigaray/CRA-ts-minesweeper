import { board } from "./board";
import { SquareIndex } from "./board-interfaces";

export const squareWasClicked = (index: SquareIndex) => async (
  dispatch: Function
) => dispatch(board.actions.clickSquare(index));
