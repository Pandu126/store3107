import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    console.log(action);
    return {
      ...state,
      errorMessage: action.message,
      showloginError: action.showloginError,
    };
  })
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
