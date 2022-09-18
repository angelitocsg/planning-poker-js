import { createReducer, on } from '@ngrx/store';

import { GameSessionViewModel } from '../models/game-session-view-model';
import {
  resetSession,
  updateGameSessionAction,
  updateLocalPlayerNameAction,
  updateSessionAndPlayerAction,
} from './game.action';
import { StateContainer } from './state.container';

const initialState = new StateContainer();

export const GameReducer = createReducer(
  initialState,
  on(
    updateSessionAndPlayerAction,
    (
      state: any,
      { sessionId, localPlayerName }: { sessionId: string; localPlayerName: string }
    ) => ({
      ...state,
      sessionId: sessionId,
      localPlayerName: localPlayerName,
    })
  ),
  on(
    updateLocalPlayerNameAction,
    (state: any, { localPlayerName }: { localPlayerName: string }) => ({
      ...state,
      localPlayerName: localPlayerName,
    })
  ),
  on(
    updateGameSessionAction,
    (state: any, { gameSession }: { gameSession: GameSessionViewModel }) => ({
      ...state,
      gameSession: gameSession,
    })
  ),
  on(resetSession, () => initialState)
);
