import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/Models/user.model';

export enum loginEnums {
  LOGIN_START = '[auth page] login start',
  LOGIN_SUCCESS = '[auth page] login success',
  LOGIN_FAIL = '[auth page] login fail',
  SIGNUP_START = '[auth page] signup start',
  SIGNUP_SUCCESS = '[auth page] signup success',
  AUTOLOGIN_ACTION = '[auth page] auto login',
  LOGOUT_ACTION = '[auth page] log out',
}

export const loginStart = createAction(
  loginEnums.LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  loginEnums.LOGIN_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const signUpStart = createAction(
  loginEnums.SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signUpSuccess = createAction(
  loginEnums.SIGNUP_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);
export const logOut = createAction(loginEnums.LOGOUT_ACTION);
export const autoLogin = createAction(loginEnums.AUTOLOGIN_ACTION);
export const loginFail = createAction(loginEnums.LOGIN_FAIL);
