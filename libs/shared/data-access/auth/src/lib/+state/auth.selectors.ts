import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUTH_FEATURE_KEY,
  AuthState,
  selectAll,
  selectEntities,
  User
} from './auth.reducer';

const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getLoaded = createSelector(
  getAuthState,
  (state: AuthState) => state.loaded
);

const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

const getAllAuth = createSelector(
  getAuthState,
  selectAll
);

const getSelectedId = createSelector(
  getAuthState,
  (state: AuthState) => state.selectedId
);

const getEntitites = createSelector(
  getAuthState,
  selectEntities
);

const getSelectedAuth = createSelector(
  getEntitites,
  getSelectedId,
  (users, id) => users[id]
);

export const authQuery = {
  getLoaded,
  getError,
  getAllAuth,
  getSelectedAuth,
  getSelectedId
};
