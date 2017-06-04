import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Api } from './../tools/Api'
import { Session, SessionService } from '../session'

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { User } from './users.model';
import { userUpdatedAction } from './users.actions';

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export const LS_USER_SESSION = 'user_session';

@Injectable()
export class UsersService extends Api {
  private baseEndpoint = this.baseUrl + '/users'
  private sessionEndpoint = this.baseUrl + '/sessions'

  constructor(http: Http, sessionService: SessionService, store: Store<AppState>) {
    super(http, sessionService, store)
  }

  signUp(data: SignUpParams): Observable<User> {
    return this.http
      .post(this.baseEndpoint, data, this.defaultOpts)
      .map(res => new User(res.json()))
      .share()
      .catch(this.handleError)
  }

  signIn(data: SignInParams): Observable<Session> {
    return this.http
      .post(this.sessionEndpoint, data, this.defaultOpts)
      .map(res => new Session(res.json()))
      .do(session => this.sessionService.signUserIn(session))
      .share()
      .catch(this.handleError)
  }

  signOut(): Observable<Response> {
    const endpoint = this.sessionEndpoint + `/` + this.sessionService.getSession().token;

    return this.http
      .delete(endpoint, this.defaultOpts)
      .do(() => this.sessionService.signUserOut())
      .share()
      .catch(err => this.fail(err))
  }

  refreshUserData(userId: number): Observable<User> {
    const endpoint = this.baseEndpoint + `/` + userId;

    return this.http
      .get(endpoint, this.defaultOpts)
      .map(res => new User(res.json()))
      .do(user => this.store.dispatch(userUpdatedAction(user)))
      .share()
      .catch(this.fail)
  }

  fail(err: any): Observable<any> {
    console.error(err)
    return Observable.throw(err);
  }

  handleError(err: Response, o: any): Observable<any> {
    const error = super.handleBasicErrors(err)
    return Observable.throw(error);
  }
}
