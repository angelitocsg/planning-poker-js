import { CardViewModel } from './card-view-model';

export interface IPlayerViewModel {
  name: string;
  lastMove?: CardViewModel;
}

export class PlayerViewModel implements IPlayerViewModel {
  name: string;
  lastMove?: CardViewModel;

  constructor(name: string) {
    this.name = name;
  }
}
