import { game } from "./game";

export const loseGame = () => async (dispatch: Function) => {
  dispatch(game.actions.loseGame());
};
