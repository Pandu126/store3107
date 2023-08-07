import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/Models/user.model';

export enum loginEnums {
  LOGIN_START = '[auth page] login start',
  LOGIN_SUCCESS = '[auth page] login success',
  LOGIN_FAIL = '[auth page] login fail',
  SIGNUP_START = '[auth page] signup start',
  SIGNUP_SUCCESS = '[auth page] signup success',
}

export const loginStart = createAction(
  loginEnums.LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  loginEnums.LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const signUpStart = createAction(
  loginEnums.SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signUpSuccess = createAction(
  loginEnums.SIGNUP_SUCCESS,
  props<{ user: User }>()
);

export const loginFail = createAction(loginEnums.LOGIN_FAIL);
