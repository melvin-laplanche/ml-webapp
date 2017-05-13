import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Api } from './../api'
import { User } from './models'

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService extends Api {
  private baseEndpoint = this.baseUrl + "/users"

  constructor(http: Http) {
    super(http)
  }

  signUp(data: SignUpParams): Observable<User> {
    return this.http
      .post(this.baseEndpoint, data, this.defaultHeaders)
      .map(res => new User(res.json()))
      .catch(this.handleError)
  }

  handleError(err: Response, o: Observable<User>): Observable<any> {
    const error = super.handleBasicErrors(err)
    return Observable.throw(error);
  }
}
