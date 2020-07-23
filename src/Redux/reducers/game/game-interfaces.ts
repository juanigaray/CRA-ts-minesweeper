export enum GameStatus {
  Lost,
  Playing,
}

export interface GameState {
  gameStatus: GameStatus;
}
