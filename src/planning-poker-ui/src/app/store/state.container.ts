import { CardNumber } from '../core/enums/card-number';
import { GameSessionViewModel } from '../models/game-session-view-model';
import { SummaryViewModel } from '../models/summary-view-model';

export const MIN_DATE = new Date(1970, 0, 1);

export interface IStateContainer {
  sessionId: string;
  gameSession: GameSessionViewModel;
  localPlayerName: string;
  startedAt: Date;
  started: boolean;
  summaryData: SummaryViewModel[];
}

export class StateContainer implements IStateContainer {
  sessionId: string = '';
  gameSession: GameSessionViewModel = new GameSessionViewModel();
  localPlayerName: string = '';
  startedAt: Date = MIN_DATE;
  started: boolean = MIN_DATE != this.startedAt;

  get summaryData(): SummaryViewModel[] {
    if (this.gameSession == null) return [];

    console.log('Calculating summary');

    var data: SummaryViewModel[] = [];
    var summaryData = this.gameSession.players
      .filter((w) => w.lastMove != null)
      .reduce((pv, c) => {
        var exists = pv.find((f) => f.number === c.lastMove?.number);
        if (!exists && c.lastMove?.number) {
          pv.push({ number: c.lastMove?.number, votes: '1' });
          return pv;
        }

        if (exists) exists.votes = exists.votes + 1;

        return pv;
      }, data)
      .sort((a, b) => (a.number > b.number ? 1 : 0));

    if (summaryData?.length == 0)
      return [
        {
          number: CardNumber.Zero,
          votes: 'Média',
        },
      ];

    var average = summaryData?.reduce((a, b) => a + b.number, 0) / summaryData.length;
    console.log('Average: ', average);

    summaryData.push({ votes: 'Média', number: average });
    return summaryData;
  }
}
