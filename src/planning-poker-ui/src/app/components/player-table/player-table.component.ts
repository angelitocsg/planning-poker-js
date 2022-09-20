import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CardNumber } from '../../core/enums/card-number';
import { Side } from '../../core/enums/side';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  @Input() playerName: string = '';
  @Input() highlight: boolean = false;
  @Input() active: boolean = false;
  @Input() placed?: CardNumber;
  @Output() onCardNumberClick: EventEmitter<any> = new EventEmitter();

  allSides = Side;
  allCardNumbers= CardNumber;

  constructor() {}

  ngOnInit(): void {}

  handleCardNumberClick() {
    if (this.onCardNumberClick) this.onCardNumberClick.emit(null);
  }

  getPlayerTableActiveStyle = () => (this.active ? 'highlight' : '');
  getPlayerTableStyle = () => `player-table ${this.getPlayerTableActiveStyle()}`;
}
