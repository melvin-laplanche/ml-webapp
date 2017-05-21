import { Action } from '@ngrx/store';

export const SIGN_IN = 'SIGN_IN';
export function signInAction(): Action {
  return {
    type: SIGN_IN
  }
}


export const SIGN_OUT = 'SIGN_OUT';
export function signOutAction(): Action {
  return {
    type: SIGN_OUT
  }
}