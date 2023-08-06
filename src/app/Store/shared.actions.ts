import { createAction, props } from '@ngrx/store';

export enum sharedActions {
  SET_LOADING_ACTION = '[shared state] set loading spinner',
  SET_ERROR_MESSAGE = '[shared state] set error message',
}

export const setLoadingSpinner = createAction(
  sharedActions.SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  sharedActions.SET_ERROR_MESSAGE,
  props<{ message: string }>()
);
