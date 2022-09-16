import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
})
export class PlayerModalComponent implements OnInit {
  @Input() disabledOk?: boolean;
  @Input() labelOk?: string;
  @Input() labelCancel?: string;
  @Input() title?: string;
  @Output() onOkClick!: EventEmitter<string>;
  @Output() onCancelClick!: EventEmitter<any>;

  formModel = this.formBuilder.group({
    playerName: '',
  });

  get playerName() {
    return this.formModel.get('playerName')?.value;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  handleFormSubmit() {
    console.log('FormModel.PlayerName: {0}', this.playerName);

    if (this.playerName) this.onOkClick?.emit(this.playerName);
  }

  getBtnPrimaryOnlyStyle() {
    return !this.labelCancel ? 'only' : '';
  }

  getBtnPrimaryStyle() {
    return `btn btn-primary ${this.getBtnPrimaryOnlyStyle()}`;
  }
}
