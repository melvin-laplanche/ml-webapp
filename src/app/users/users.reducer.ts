import { Action } from '@ngrx/store';

import { SIGN_IN, SIGN_OUT, USER_UPDATED } from './users.actions';
import { User } from './users.model';

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

function reducerData(state: User = null, action: Action) {
  switch (action.type) {
    case USER_UPDATED:
      return action.payload;
    default:
      return state
  }
}

export const usersReducer = {
  userState: reducerStatus,
  userData: reducerData,
};