import { Action } from '@ngrx/store';

import { SIGN_IN, SIGN_OUT } from './users.actions';

function reducerStatus(state: boolean = false, action: Action) {
  switch (action.type) {
    case SIGN_IN:
      return true;
    case SIGN_OUT:
      return false;
    default:
      return state
  }
}

export const usersReducer = { userState: reducerStatus };