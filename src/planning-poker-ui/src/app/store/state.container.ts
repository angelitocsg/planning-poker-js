import { GameSessionViewModel } from '../models/game-session-view-model';

const minDate = new Date(1970, 0, 1);

export interface IStateContainer {
  sessionId: string;
  gameSession: GameSessionViewModel;
  localPlayerName: string;
  startedAt: Date;
  started: boolean;
}

export class StateContainer implements IStateContainer {
  sessionId: string = '';
  gameSession: GameSessionViewModel = new GameSessionViewModel();
  localPlayerName: string = '';
  startedAt: Date = new Date(1970, 0, 1);
  started: boolean = minDate != this.startedAt;
}
