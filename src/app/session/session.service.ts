import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { signInAction, signOutAction } from '../app.actions';

import { Session } from './session.model'

export const LS_USER_SESSION = 'user_session';

@Injectable()
export class SessionService {
  private session: Session = null;
  private sessionFetched = false;

  constructor(private store: Store<AppState>) {
  }

  signUserIn(session: Session) {
    this.session = session;
    localStorage.setItem(LS_USER_SESSION, JSON.stringify(session));
    this.store.dispatch(signInAction());
  }

  signUserOut() {
    localStorage.removeItem(LS_USER_SESSION);
    this.store.dispatch(signOutAction());
    this.session = null;
  }

  getSession(): Session {
    if (this.session == null && !this.sessionFetched) {
      this.session = this.fetchSession();
      this.sessionFetched = true;
    }
    return this.session;
  }

  private fetchSession(): Session {
    try {
      const dataStr = localStorage.getItem(LS_USER_SESSION);
      if (!dataStr) {
        throw new Error('no session found');
      }

      const session = new Session(JSON.parse(dataStr));
      // Let's soft check that the data aren't fake
      if (session.userId <= 0 || !session.token) {
        throw new Error('Invalid Data');
      }
      return session;
    } catch (err) {
      this.signUserOut()
      return null;
    }
  }
}
