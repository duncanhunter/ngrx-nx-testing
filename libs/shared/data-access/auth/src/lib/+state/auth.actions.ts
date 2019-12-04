import { createAction, props } from '@ngrx/store';
import { User } from './auth.reducer';

export const loadAuth = createAction('[Auth] Load Auth');

export const authLoadError = createAction(
  '[Auth] Auth Load Error',
  props<{ error: string }>()
);

export const authLoaded = createAction(
  '[Auth] Auth Loaded',
  props<{ users: User[] }>()
);

export const fromAuthActions = {
  loadAuth,
  authLoaded,
  authLoadError
};
