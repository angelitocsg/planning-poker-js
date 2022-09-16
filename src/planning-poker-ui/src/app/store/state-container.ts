const minDate = new Date(1970, 0, 1);

export interface IStateContainer {
  sessionId: string;
  gameSession: object;
  localPlayerName: string;
  startedAt: Date;
  started: boolean;
}

export class StateContainer implements IStateContainer {
  sessionId: string = '';
  gameSession: object = {};
  localPlayerName: string = '';
  startedAt: Date = new Date(1970, 0, 1);
  started: boolean = minDate != this.startedAt;
}
