import { createReducer, on } from '@ngrx/store';

import { changeLocalPlayerNameAction, changeSessionIdAction } from './game.action';
import { StateContainer } from './state-container';

const initialState = new StateContainer();

export const GameReducer = createReducer(
  initialState,
  on(changeSessionIdAction, (state: any, { sessionId }: { sessionId: string }) => ({
    ...state,
    sessionId: sessionId,
  })),
  on(
    changeLocalPlayerNameAction,
    (state: any, { localPlayerName }: { localPlayerName: string }) => ({
      ...state,
      localPlayerName: localPlayerName,
    })
  )
);
