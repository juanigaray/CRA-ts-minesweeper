import { game } from "./game";

export const loseGame = () => async (dispatch: Function) => {
  dispatch(game.actions.loseGame());
};

export const startOver = () => async () => {
  // todo
  return null;
};
