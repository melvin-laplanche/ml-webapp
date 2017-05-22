import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Api } from './../api'
import { User } from './users.model'
import { Session } from '../session/session.model'
import { SessionService } from '../session/session.service'

import 'rxjs/add/operator/publish';

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
  private baseEndpoint = this.baseUrl + "/users"
  private sessionEndpoint = this.baseUrl + "/sessions"

  constructor(http: Http, sessionService: SessionService) {
    super(http, sessionService)
  }

  signUp(data: SignUpParams): Observable<User> {
    return this.http
      .post(this.baseEndpoint, data, this.defaultHeaders)
      .map(res => new User(res.json()))
      .share()
      .catch(this.handleError)
  }

  signIn(data: SignInParams): Observable<Session> {
    return this.http
      .post(this.sessionEndpoint, data, this.defaultHeaders)
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

  fail(err: any): Observable<any> {
    console.error(err)
    return Observable.throw(err);
  }

  handleError(err: Response, o: any): Observable<any> {
    const error = super.handleBasicErrors(err)
    return Observable.throw(error);
  }
}
