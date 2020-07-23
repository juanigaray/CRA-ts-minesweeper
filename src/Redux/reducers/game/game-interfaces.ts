export enum GameStatus {
  Lost,
  Playing,
  Won,
}

export interface GameState {
  gameStatus: GameStatus;
}
