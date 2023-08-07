import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { logOut, loginSuccess, signUpSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signUpSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logOut, (action, state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
