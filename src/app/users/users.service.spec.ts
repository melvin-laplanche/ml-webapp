import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { USER_UPDATED } from '../app.actions';

import { UserPayload, User } from './users.model';

// Stubs

import { Http, Response, ResponseOptions, Headers } from '@angular/http';
class HttpStub {
  post() { }
  delete() { }
  get() { }
}

import { Session, SessionPayload } from '../session/session.model';
import { SessionService } from '../session/session.service';
class SessionServiceStub {
  signUserIn() { }
  signUserOut() { }

  getSession(): Session {
    return null;
  }
}

import { Store } from '@ngrx/store';
class StoreStub {
  dispatch(action: Action) { }
}

// Test

import { UsersService, SignUpParams, SignInParams } from './users.service';
describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        SessionService,
        { provide: Store, useClass: StoreStub },
        { provide: Http, useClass: HttpStub },
        { provide: SessionService, useClass: SessionServiceStub }
      ]
    });
  });

  it('should sign up the user',
    inject([UsersService, SessionService, Http],
      (service: UsersService, sessionService: SessionService, http: Http) => {
        // Create fake user data
        const signUpParams: SignUpParams = {
          name: 'user name',
          password: 'password',
          email: 'user email',
        };

        // Check and Fake the POST request
        spyOn(http, 'post').and.callFake((endpoint: string, data: SignUpParams, opts: {}) => {
          expect(data.name).toBe(signUpParams.name, 'the name should have not changed');
          expect(data.password).toBe(signUpParams.password, 'the password should have not changed');
          expect(data.email).toBe(signUpParams.email, 'the email should have not changed');

          const userPld: UserPayload = {
            id: 'xxxx-yyyy-zzzz',
            name: signUpParams.name,
            email: signUpParams.email,
          }
          const httpResponse = new Response(new ResponseOptions({
            body: JSON.stringify(userPld),
            status: 201,
            headers: new Headers(),
          }));

          return Observable.of(httpResponse);
        });

        // Control the output
        service.signUp(signUpParams).subscribe((u: User) => {
          expect(u.id).toBeTruthy('the user ID should be defined');
          expect(u.name).toBe(signUpParams.name, 'the name should have not changed in the final response');
          expect(u.email).toBe(signUpParams.email, 'the email should have not changed in the final response');
        });
      }));

  it('should fail signing up the user on http error',
    inject([UsersService, Http],
      (service: UsersService, http: Http) => {
        // Create fake user data
        const signUpParams: SignUpParams = {
          name: 'user name',
          password: 'password',
          email: 'user email',
        };

        // Fake the POST request
        spyOn(http, 'post').and.returnValue(Observable.throw('err'));

        // Control the output
        let signUpFailed = false;
        service.signUp(signUpParams).subscribe((u: User) => {
          fail('the call should fail')
        }, (err) => {
          signUpFailed = true;
        });

        expect(signUpFailed).toBe(true, 'the fail callback should have been called');
      }));

  it('should sign in the user',
    inject([UsersService, SessionService, Http],
      (service: UsersService, sessionService: SessionService, http: Http) => {
        // Create fake user data
        const signInParams: SignInParams = {
          password: 'password',
          email: 'user email',
        };

        const expectedSession: SessionPayload = {
          token: 'xxxx-yyyy-zzzz',
          user_id: 'user-id',
        }

        // Check and Fake the POST request
        spyOn(http, 'post').and.callFake((endpoint: string, data: SignInParams, opts: {}) => {
          expect(data.password).toBe(signInParams.password, 'the password should have not changed');
          expect(data.email).toBe(signInParams.email, 'the email should have not changed');

          const httpResponse = new Response(new ResponseOptions({
            body: JSON.stringify(expectedSession),
            status: 201,
            headers: new Headers(),
          }));
          return Observable.of(httpResponse);
        });

        // Make sure we are saving the user session
        const sessionSignInSpy = spyOn(sessionService, 'signUserIn');
        sessionSignInSpy.and.callFake((session: Session) => {
          expect(session.token).toBe(expectedSession.token, 'the token should have not changed');
          expect(session.userId).toBe(expectedSession.user_id, 'the user_id should have not changed');
        });

        // Control the output
        service.signIn(signInParams).subscribe((s: Session) => {
          expect(s.token).toBe(expectedSession.token, 'the final token should have not changed');
          expect(s.userId).toBe(expectedSession.user_id, 'the final user ID should have not changed');
        });

        expect(sessionSignInSpy.calls.count()).toBe(1, 'signUserIn hasn\'t been called');
      }));

  it('should fail signing in the user on http error',
    inject([UsersService, Http],
      (service: UsersService, http: Http) => {
        // Create fake user data
        const signInParams: SignInParams = {
          password: 'password',
          email: 'user email',
        };

        // Fake the POST request
        spyOn(http, 'post').and.returnValue(Observable.throw('err'));

        // Control the output
        let signInFailed = false;
        service.signIn(signInParams).subscribe((u: Session) => {
          fail('the call should fail')
        }, (err) => {
          signInFailed = true;
        });

        expect(signInFailed).toBe(true, 'the fail callback should have been called');
      }));

  it('should sign out the user',
    inject([UsersService, SessionService, Http],
      (service: UsersService, sessionService: SessionService, http: Http) => {
        // Fake the http response
        const httpResponse = new Response(new ResponseOptions({
          body: '',
          status: 204,
          headers: new Headers(),
        }))
        const httpDeleteSpy = spyOn(http, 'delete');
        httpDeleteSpy.and.returnValue(Observable.of(httpResponse));

        // setup a fake session
        spyOn(sessionService, 'getSession').and.returnValue(new Session({ token: 'token', user_id: '42' }));

        // const httpDeleteSpy = spyOn(sessionService, 'getSession')
        const sessionSignOutSpy = spyOn(sessionService, 'signUserOut')

        // call the method
        let signOutSucceed = false;
        service.signOut().subscribe(() => {
          signOutSucceed = true
        })

        // control the method got called
        expect(signOutSucceed).toBe(true, 'signOut failed');
        expect(httpDeleteSpy.calls.count()).toBe(1, 'http.delete hasn\'t been called');
        expect(sessionSignOutSpy.calls.count()).toBe(1, 'signUserOut hasn\'t been called');
      }));

  it('should fail signing out the user on http error',
    inject([UsersService, SessionService, Http],
      (service: UsersService, sessionService: SessionService, http: Http) => {
        // Fake the DELETE request
        spyOn(http, 'delete').and.returnValue(Observable.throw('err'));

        // setup a fake session
        spyOn(sessionService, 'getSession').and.returnValue(new Session({ token: 'token', user_id: '42' }));

        // Control the output
        let signOutFailed = false;
        service.signOut().subscribe(() => {
          fail('the call should fail')
        }, (err) => {
          signOutFailed = true;
        });

        expect(signOutFailed).toBe(true, 'the fail callback should have been called');
      }));

  it('should refresh the user',
    inject([UsersService, Store, Http],
      (service: UsersService, store: Store<any>, http: Http) => {
        // Fake user returned by the api
        const expectedUser: UserPayload = {
          id: 'xxxx-yyyy-zzzz',
          name: 'name',
          email: 'email',
        }

        // Fake the http response
        const httpResponse = new Response(new ResponseOptions({
          body: JSON.stringify(expectedUser),
          status: 200,
          headers: new Headers(),
        }))
        const httpGetSpy = spyOn(http, 'get');
        httpGetSpy.and.returnValue(Observable.of(httpResponse));

        // spy on the dispatch
        const dispatchSpy = spyOn(store, 'dispatch');

        // call the method
        let refreshSucceed = false;
        service.refreshUserData(expectedUser.id).subscribe(() => {
          refreshSucceed = true;
        });

        // control the method got called
        expect(refreshSucceed).toBe(true, 'refreshSucceed failed');
        expect(httpGetSpy.calls.count()).toBe(1, 'http.get hasn\'t been called');

        const dispatchArg = <Action>dispatchSpy.calls.first().args[0];
        expect(dispatchArg.type).toBe(USER_UPDATED, 'should dispatch the USER_UPDATED action');
      }));

  it('should fail refreshing the user on http error',
    inject([UsersService, Store, Http],
      (service: UsersService, store: Store<any>, http: Http) => {
        // Fake the GET request
        spyOn(http, 'get').and.returnValue(Observable.throw('err'));

        // spy on the dispatch
        const dispatchSpy = spyOn(store, 'dispatch');

        // Control the output
        let refreshFailed = false;
        service.refreshUserData('42').subscribe(() => {
          fail('the call should fail');
        }, (err) => {
          refreshFailed = true;
        });

        expect(dispatchSpy.calls.count()).toBe(0, 'dispatch should have not been called');
        expect(refreshFailed).toBe(true, 'the fail callback should have been called');
      }));
});
