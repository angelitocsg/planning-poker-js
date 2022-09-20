import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { TimerStatus } from '../../core/enums/timer-status';
import { CssHelper } from '../../helpers/css-helper';

@Component({
  selector: 'app-session-timer',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.scss'],
})
export class SessionTimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() startedAt: Date = new Date();
  @Input() running: boolean = false;
  @Input() ended: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  status: TimerStatus = this.running
    ? TimerStatus.Running
    : this.ended
    ? TimerStatus.Stopped
    : TimerStatus.NotStarted;

  timer: string = '00:00';

  get label(): string {
    return this.status == TimerStatus.NotStarted
      ? 'iniciar'
      : this.status == TimerStatus.Running
      ? 'parar'
      : 'reiniciar';
  }

  private timerTicker?: ReturnType<typeof setInterval>;

  constructor() {}

  ngOnInit(): void {
    this.setupStarted();
    this.setupStoped();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanges');
    this.setupStarted();
    this.setupStoped();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerTicker);
  }

  handleOnClick() {
    if (this.onClick) this.onClick.emit();
  }

  _sessionTimerStyle: string[] = CssHelper.create('session-timer');
  get sessionTimerStyle(): string {
    return CssHelper.join(this._sessionTimerStyle);
  }

  _sessionButtonStyle: string[] = CssHelper.create(
    'btn',
    'btn-primary',
    'session-button'
  );
  get sessionButtonStyle(): string {
    return CssHelper.join(this._sessionButtonStyle);
  }

  setupStarted() {
    if (!this.running) return;

    this.timerTicker = setInterval(this.updateClock, 1000);

    this._sessionTimerStyle = CssHelper.addClass(this._sessionTimerStyle, 'highlight');
    this._sessionButtonStyle = CssHelper.addClass(this._sessionButtonStyle, 'btn-secondary');
    this._sessionButtonStyle = CssHelper.removeClass(this._sessionButtonStyle, 'btn-primary');
  }

  updateClock() {
    var date = new Date(Date.now() - this.startedAt.getTime());
    this.timer = `${date.getMinutes}:${date.getSeconds}`;
  }

  setupStoped() {
    if (this.running) return;

    clearInterval(this.timerTicker);

    this._sessionTimerStyle = CssHelper.removeClass(this._sessionTimerStyle, 'highlight');
    this._sessionButtonStyle = CssHelper.removeClass(this._sessionButtonStyle, 'btn-secondary');
    this._sessionButtonStyle = CssHelper.addClass(this._sessionButtonStyle, 'btn-primary');
  }
}
