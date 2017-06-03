import { Action } from '@ngrx/store';

import { MENU_OPEN, MENU_CLOSE } from './left-drawer.actions'

function reducerMenuState(state: boolean = false, action: Action) {
  switch (action.type) {
    case MENU_OPEN:
      return true
    case MENU_CLOSE:
      return false
    default:
      return state
  }
}

export const leftDrawerReducer = {
  menuState: reducerMenuState,
};
