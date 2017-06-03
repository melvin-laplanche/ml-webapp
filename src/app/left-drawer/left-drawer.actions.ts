import { Action } from '@ngrx/store';

export const MENU_OPEN = 'MENU_OPEN';
export function openMenuAction(): Action {
  return {
    type: MENU_OPEN
  }
}

export const MENU_CLOSE = 'MENU_CLOSE';
export function closeMenuAction(): Action {
  return {
    type: MENU_CLOSE
  }
}
