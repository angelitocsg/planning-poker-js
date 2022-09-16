import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { CardNumber } from '../../core/enums/card-number';
import { Side } from '../../core/enums/side';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() number?: CardNumber;
  @Input() side!: Side;
  @Input() small!: boolean;
  @Input() onClick!: (number: CardNumber) => void;

  constructor() {}

  ngOnInit(): void {}

  getSmall = () => this.small;

  getSide = (): boolean => (this.side == Side.Front ? true : false);

  getCardFrontSmallStyle(): string {
    return this.small ? 'card-small' : '';
  }

  getCardFrontStyle(): string {
    return `card-default card-front ${this.getCardFrontSmallStyle()}`;
  }

  getCardBackSmallStyle(): string {
    return this.small ? 'card-small' : '';
  }
  getCardBackStyle(): string {
    return `card-default card-back ${this.getCardBackSmallStyle()}`;
  }

  getCardBackLineSmallStyle(): string {
    return this.small ? 'card-small' : '';
  }
  getCardBackLineStyle(): string {
    return `card-default card-back-line ${this.getCardBackLineSmallStyle()}`;
  }

  handleClick() {
    if (this.number != null && this.onClick != null) this.onClick(this.number);
  }
}
