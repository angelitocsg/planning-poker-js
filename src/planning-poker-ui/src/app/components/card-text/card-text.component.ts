import { Component, Input, OnInit } from '@angular/core';
import { CardNumber } from '../../core/enums/card-number';

@Component({
  selector: 'app-card-text',
  templateUrl: './card-text.component.html',
  styleUrls: ['./card-text.component.scss'],
})
export class CardTextComponent implements OnInit {
  @Input() number?: CardNumber;
  @Input() small!: boolean;

  constructor() {}

  ngOnInit(): void {}

  getNumber = () => this.number;

  getCardTextSmallStyle() {
    return this.small ? 'card-text-small' : '';
  }

  getCardTextStyle() {
    return `card-text ${this.getCardTextSmallStyle()}`;
  }
}
