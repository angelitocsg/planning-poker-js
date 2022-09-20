import { CardNumber } from '../core/enums/card-number';
import { Side } from '../core/enums/side';

export interface PlayerOnTable {
  playerName: string;
  number?: CardNumber;
  cardSide: Side;
}
