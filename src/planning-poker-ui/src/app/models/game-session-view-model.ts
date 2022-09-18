import { PlayerViewModel } from './player-view-model';

export interface IGameSessionViewModel {
  id: string;
  description: string;
  owner: PlayerViewModel;
  player: PlayerViewModel[];
  active: boolean;
  createAt?: Date;
  startedAt?: Date;
  stopedAt?: Date;
  errorMessages?: string[];
  hasError: boolean;
  notStarted: boolean;
  running: boolean;
  ended: boolean;
  toString(): string;
}

export class GameSessionViewModel implements IGameSessionViewModel {
  id: string = '';
  description: string = '';
  owner: PlayerViewModel = new PlayerViewModel('');
  player: PlayerViewModel[] = [];
  active: boolean = false;
  createAt?: Date;
  startedAt?: Date;
  stopedAt?: Date;
  errorMessages?: string[];
  get hasError() {
    return this.errorMessages != null && this.errorMessages.length > 0;
  }
  notStarted: boolean = false;
  running: boolean = false;
  ended: boolean = false;

  toString(): string {
    return JSON.stringify(this);
  }
}
