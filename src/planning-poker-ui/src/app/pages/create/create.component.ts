import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  ownerName: string = '';
  loading: boolean = false;
  get labelOk(): string {
    return this.loading ? 'criando...' : 'criar sessão';
  }

  constructor(private _sessionService: SessionService) {}

  ngOnInit(): void {}

  handleEnter(ownerName: string) {
    this.loading = true;

    if (!ownerName) return;

     this._sessionService.createSession(ownerName);
  }

  enterToSession() {
    this.loading = false;
    // console.log("Sessão criada: {0}", _stateContainer?.GameSession?.Id);
    // _navigationManager.NavigateTo($"/session/{_stateContainer?.GameSession?.Id}");
  }
}
