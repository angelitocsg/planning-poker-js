import { Component, Input, OnInit } from '@angular/core';
import { Side } from '../../core/enums/side';
import { SummaryViewModel } from '../../models/summary-view-model';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent implements OnInit {
  @Input() summaryData?: SummaryViewModel[];

  get side() {
    return Side.Front;
  }

  constructor() {}

  ngOnInit(): void {}
}
