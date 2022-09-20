import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { CardNumber } from '../core/enums/card-number';
import { GameHubActions } from '../core/game-hub-actions';
import { GameHubListeners } from '../core/game-hub-listeners';
import { GameSessionViewModel } from '../models/game-session-view-model';
import {
  resetSession,
  updateGameSessionAction,
  updateLocalPlayerNameAction,
  updateSessionAndPlayerAction,
} from '../store/game.action';
import { IStateContainer } from '../store/state.container';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private connection!: signalR.HubConnection;

  constructor(
    private store: Store<{ stateContainer: IStateContainer }>,
    private localStorage: LocalStorageService
  ) {}

  async connect() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.backendUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    await this.connection.start();

    this.connection.onclose(async (error) => {
      console.log('[Service] Conexão perdida: ', error?.message);
      await this.connection.start();
    });

    this.connection.onreconnecting(async (error) => {
      console.log('[Service] Reconectando... ', error?.message);
    });

    this.connection.onreconnected(async (connectionId) => {
      console.log('[Service] Reconectado! ', connectionId);
    });

    this.registerListeners();
  }

  registerListeners() {
    this.connection.on(GameHubListeners.SessionContent, (value) => {
      console.log('[Service] SessionContent received. HasValue: ', value != null);

      if (!value) return;

      var content = JSON.parse(value) as GameSessionViewModel;

      console.log(JSON.stringify(content));

      this.store.dispatch(updateGameSessionAction({ gameSession: content }));
      this.localStorage.set('SessionId', content.id);
    });

    this.connection.on(GameHubListeners.SessionError, (value) => {
      console.log('[Service] SessionError received.');

      if (!value) return;

      console.log(JSON.stringify(value));
    });
  }

  async createSession(ownerName: string) {
    console.log('[Service] CreateSession: ', ownerName);

    await this.connect();
    await this.connection.invoke(GameHubActions.CreateSession, ownerName);

    this.store.dispatch(updateLocalPlayerNameAction({ localPlayerName: ownerName }));
    this.localStorage.set('PlayerName', ownerName);
  }

  async joinSession(sessionId: string, playerName: string) {
    console.log('[Service] JoinSession: ', sessionId, playerName);
    await this.connect();
    await this.connection.invoke(GameHubActions.JoinSession, sessionId, playerName);

    this.store.dispatch(updateLocalPlayerNameAction({ localPlayerName: playerName }));
    this.localStorage.set('PlayerName', playerName);
  }

  async startSession() {
    var playerName = await this.getPlayerName();
    var sessionId = await this.getSessionId();
    console.log('[Service] StartSession: ', sessionId, playerName);
    if (this.connection == null) await this.connect();
    await this.connection.invoke(GameHubActions.StartSession, sessionId, playerName);
  }

  async restartSession() {
    var playerName = await this.getPlayerName();
    var sessionId = await this.getSessionId();
    console.log('[Service] RestartSession: ', sessionId, playerName);
    if (this.connection == null) await this.connect();
    await this.connection.invoke(GameHubActions.RestartSession, sessionId, playerName);
  }

  async stopSession() {
    var playerName = await this.getPlayerName();
    var sessionId = await this.getSessionId();
    console.log('[Service] StopSession: ', sessionId, playerName);
    if (this.connection == null) await this.connect();
    await this.connection.invoke(GameHubActions.StopSession, sessionId, playerName);
  }

  async updateDescription(description: string) {
    var playerName = await this.getPlayerName();
    var sessionId = await this.getSessionId();
    console.log('[Service] UpdateDescription: ', sessionId, playerName, description);
    if (this.connection == null) await this.connect();
    await this.connection.invoke(
      GameHubActions.UpdateDescription,
      sessionId,
      playerName,
      description
    );
  }

  async selectCardNumber(number: CardNumber) {
    var playerName = await this.getPlayerName();
    var sessionId = await this.getSessionId();
    console.log('[Service] SelectCardNumber: ', sessionId, playerName);
    if (this.connection == null) await this.connect();
    await this.connection.invoke(
      GameHubActions.SelectCardNumber,
      sessionId,
      playerName,
      number
    );
  }

  async hasSession(pSessionId?: string) {
    var sessionId = pSessionId ?? (await this.getSessionId());
    console.log('[Service] HasSession: ', pSessionId, sessionId);

    if (sessionId) return false;
    if (this.connection == null) await this.connect();
    var hasSession = await this.connection.invoke<boolean>(
      GameHubActions.HasSession,
      sessionId
    );

    if (!hasSession) {
      this.clearSession();
      this.store.dispatch(resetSession());
    }

    console.log('[Service] HasSession: ', hasSession);
    return hasSession;
  }

  getSessionId = () => this.localStorage.get('SessionId');
  getPlayerName = () => this.localStorage.get('PlayerName');

  clearSession() {
    this.localStorage.remove('SessionId');
    this.localStorage.remove('PlayerName');
  }

  async validSession(pSessionId: string) {
    var playerName = await this.getPlayerName();
    var sessionId = await this.getSessionId();

    console.log(
      `[Service] ValidSession:\n SessionId ${sessionId}\n pSessionId ${pSessionId}\n PlayerName ${playerName}\n`
    );

    if (playerName && sessionId)
      this.store.dispatch(
        updateSessionAndPlayerAction({
          localPlayerName: playerName,
          sessionId: sessionId,
        })
      );

    if (pSessionId && pSessionId != sessionId)
      this.localStorage.set('SessionId', pSessionId);

    var valid = playerName && sessionId;

    console.log('[Service] ValidSession: ', valid);
    return valid;
  }
}
