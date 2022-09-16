import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { CardTextComponent } from './components/card-text/card-text.component';
import { CardComponent } from './components/card/card.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import { PlayerModalComponent } from './components/player-modal/player-modal.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { SessionTimerComponent } from './components/session-timer/session-timer.component';
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { CreateComponent } from './pages/create/create.component';
import { NewPlayerComponent } from './pages/new-player/new-player.component';
import { SessionComponent } from './pages/session/session.component';
import { GameReducer } from './store/game.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardContainerComponent,
    CardTextComponent,
    GameTableComponent,
    PlayerModalComponent,
    PlayerTableComponent,
    SessionTimerComponent,
    SummaryTableComponent,
    CreateComponent,
    NewPlayerComponent,
    SessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      stateContainer: GameReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
