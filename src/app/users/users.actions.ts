import { Action } from '@ngrx/store';
import { User } from './users.model';

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

export const USER_UPDATED = 'USER_UPDATED';
export function userUpdatedAction(user: User): Action {
  return {
    type: USER_UPDATED,
    payload: user,
  }
}
