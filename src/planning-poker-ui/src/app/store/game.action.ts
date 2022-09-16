import { Action, createAction, props } from '@ngrx/store';

export enum GameActionType {
  CHANGE_SESSION_ID = 'CHANGE_SESSION_ID',
  CHANGE_LOCAL_PLAYER_NAME = 'CHANGE_LOCAL_PLAYER_NAME',
}

export const changeSessionIdAction = createAction(
  GameActionType.CHANGE_SESSION_ID,
  props<{ sessionId: string }>()
);

export const changeLocalPlayerNameAction = createAction(
  GameActionType.CHANGE_LOCAL_PLAYER_NAME,
  props<{ localPlayerName: string }>()
);
