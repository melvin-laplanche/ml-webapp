import { Action } from '@ngrx/store';


// Import other packages reducer
import { usersReducer } from './users/users.reducer'
import { leftDrawerReducer } from './left-drawer/left-drawer.reducer'

export const appReducer = {
  ...usersReducer,
  ...leftDrawerReducer,
};
