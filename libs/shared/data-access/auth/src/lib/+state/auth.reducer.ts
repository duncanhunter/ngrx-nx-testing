import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { fromAuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';
export interface User {
  id: string;
  name: string;
}

export interface AuthState extends EntityState<User> {
  selectedId?: string;
  loaded: boolean;
  error?: any;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: AuthState = adapter.getInitialState({
  selectedId: null,
  loaded: false
});

const userReducer = createReducer(
  initialState,
  on(fromAuthActions.authLoaded, (state, { users }) =>
    adapter.addAll(users, { ...state, loaded: true })
  )
);

export function reducer(state: AuthState | undefined, action: Action) {
  return userReducer(state, action);
}
