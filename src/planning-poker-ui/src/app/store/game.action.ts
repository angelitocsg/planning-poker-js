import { createAction, props } from '@ngrx/store';
import { GameSessionViewModel } from '../models/game-session-view-model';

export enum GameActionType {
  UPDATE_SESSION_AND_PLAYER = 'UPDATE_SESSION_AND_PLAYER',
  UPDATE_LOCAL_PLAYER_NAME = 'UPDATE_LOCAL_PLAYER_NAME',
  UPDATE_GAME_SESSION = 'UPDATE_GAME_SESSION',
  RESET_SESSION = 'RESET_SESSION',
}

export const updateSessionAndPlayerAction = createAction(
  GameActionType.UPDATE_SESSION_AND_PLAYER,
  props<{ sessionId: string; localPlayerName: string }>()
);

export const updateLocalPlayerNameAction = createAction(
  GameActionType.UPDATE_LOCAL_PLAYER_NAME,
  props<{ localPlayerName: string }>()
);

export const updateGameSessionAction = createAction(
  GameActionType.UPDATE_GAME_SESSION,
  props<{ gameSession: GameSessionViewModel }>()
);

export const resetSession = createAction(GameActionType.RESET_SESSION);
