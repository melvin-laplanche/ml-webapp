import { Action } from '@ngrx/store';

import { SIGN_IN, LOG_OUT } from './users.actions';

function reducerStatus(state: boolean = false, action: Action) {
  switch (action.type) {
    case SIGN_IN:
      return true;
    case LOG_OUT:
      return false;
    default:
      return state
  }
}

export const usersReducer = { userState: reducerStatus };