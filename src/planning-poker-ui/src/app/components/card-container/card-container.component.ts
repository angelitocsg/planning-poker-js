import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent implements OnInit {
  @Input() small?: boolean;
  @Input() label: string = '';
  @ViewChild(CardComponent) cardViewChild?: CardComponent;

  constructor() {}

  ngOnInit(): void {}

  getLabel = () => this.label;

  getContainerSmallStyle(): string {
    return this.small ? 'card-small' : '';
  }

  getContainerEmptyStyle(): string {
    return this.cardViewChild == null ? 'card-container-empty' : '';
  }

  getContainerStyle(): string {
    return `card-default card-container ${this.getContainerSmallStyle()} ${this.getContainerEmptyStyle()}`;
  }

  getCardLabelSmallStyle(): string {
    return this.small ? 'card-label-small' : '';
  }

  getCardLabelStyle(): string {
    return `card-label ${this.getCardLabelSmallStyle()}`;
  }
}
