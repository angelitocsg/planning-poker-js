import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { GameSessionViewModel } from '../../models/game-session-view-model';

import { SessionService } from '../../services/session.service';
import { updateLocalPlayerNameAction } from '../../store/game.action';
import { IStateContainer } from '../../store/state.container';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  get labelOk(): string {
    return this.loading ? 'criando...' : 'criar sessão';
  }

  private stateContainer!: Observable<IStateContainer>;
  private stateSubscription!: Subscription;

  constructor(
    private sessionService: SessionService,
    private store: Store<{ stateContainer: IStateContainer }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stateContainer = this.store.select('stateContainer');
    this.stateSubscription = this.stateContainer.subscribe((state) => {
      this.enterToSession(state.gameSession);
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription?.unsubscribe();
  }

  handleEnter(ownerName: string) {
    this.store.dispatch(updateLocalPlayerNameAction({ localPlayerName: ownerName }));
    if (!ownerName) return;
    this.loading = true;
    this.sessionService.createSession(ownerName);
  }

  enterToSession(gameSession: GameSessionViewModel) {
    this.loading = false;
    console.log('Sessão criada:', gameSession.id);
    this.router.navigate([`session/${gameSession.id}`]);
  }
}
