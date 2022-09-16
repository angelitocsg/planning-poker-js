import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SessionTimerComponent } from '../session-timer/session-timer.component';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
})
export class GameTableComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() descriptionFromHub?: string ;

  @Output() onDescriptionChange = new EventEmitter<string>();

  @ViewChild(SessionTimerComponent) sessionTimerViewChild?: SessionTimerComponent;

  formModel = this.formBuilder.group({
    description: this.descriptionFromHub,
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  getGameTableActiveStyle() {
    return this.active ? 'highlight' : '';
  }

  getGameTableStyle() {
    return `game-table ${this.getGameTableActiveStyle()}`;
  }

  handleFormSubmit() {
    console.log('formModel.description', this.formModel.get('description')?.value);

    if (this.descriptionFromHub)
      this.onDescriptionChange.emit(this.descriptionFromHub);
  }
}
