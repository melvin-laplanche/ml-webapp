import { User } from './users/users.model'

export interface AppState {
  userState: boolean;
  userData: User;
  menuState: boolean;
}