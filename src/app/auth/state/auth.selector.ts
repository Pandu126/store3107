import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export enum auth {
  AUTH_STATE_NAME = 'auth',
}

export const authStateSelector = createFeatureSelector<AuthState>(
  auth.AUTH_STATE_NAME
);

export const isAuthenticated = createSelector(authStateSelector, (state) => {
  return state.user ? true : false;
});

export const getToken = createSelector(authStateSelector, (state) => {
  return state.user ? state.user.getUserToken : null;
});
