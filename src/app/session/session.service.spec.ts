import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { SIGN_OUT, SIGN_IN } from '../app.actions';

import { Session } from './session.model';

import { Store } from '@ngrx/store';
class StoreStub {
  dispatch(action: Action) {
  }
}

import { SessionService, LS_USER_SESSION } from './session.service';
describe('SessionService', () => {
  let lsSetItem: jasmine.Spy = null;
  let lsGetItem: jasmine.Spy = null;
  let lsRemoveItem: jasmine.Spy = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: Store, useClass: StoreStub },
      ]
    });

    lsSetItem = spyOn(localStorage, 'setItem');
    lsGetItem = spyOn(localStorage, 'getItem');
    lsRemoveItem = spyOn(localStorage, 'removeItem');
  });

  const cleanup = (service: SessionService) => {
    service['session'] = null;
    service['sessionFetched'] = false;
  }

  it('should logout the user', inject([SessionService, Store], (service: SessionService, store: Store<any>) => {
    const dispatchSpy = spyOn(store, 'dispatch');
    service.signUserOut();

    const removeArg = lsRemoveItem.calls.first().args[0];
    expect(removeArg).toBe(LS_USER_SESSION, `should remove ${LS_USER_SESSION} from the localstorage`);

    const dispatchArg = <Action>dispatchSpy.calls.first().args[0];
    expect(dispatchArg.type).toBe(SIGN_OUT, 'should dispatch the SIGN_OUT action');
  }));

  it('should find a session', inject([SessionService], (service: SessionService) => {
    const tokenExpected = 'tokenValue';
    const userIdExpected = 42;

    let getItemCallCount = 0;
    lsGetItem.and.callFake((key) => {
      expect(getItemCallCount).toBe(0, 'getItem should only be called once');
      getItemCallCount++;

      expect(key).toBe(LS_USER_SESSION, `should get ${LS_USER_SESSION}`);
      // We return a stringified valid session
      return JSON.stringify(new Session({
        token: tokenExpected,
        user_id: userIdExpected,
      }));
    })

    let session = service.getSession();
    expect(session.token).toBe(tokenExpected);
    expect(session.userId).toBe(userIdExpected);

    // future calls should return the same object
    session = service.getSession();
    expect(session.token).toBe(tokenExpected);
    expect(session.userId).toBe(userIdExpected);

    cleanup(service);
  }));

  it('should not find a session when bad data are stored', inject([SessionService], (service: SessionService) => {
    lsGetItem.and.callFake((key) => {
      expect(key).toBe(LS_USER_SESSION, `should get ${LS_USER_SESSION}`);
      return `{"tokenn": "data", "user_id": 42}`;
    });

    expect(service.getSession()).toBeNull();
    cleanup(service);
  }));

  it('should not find a session when no data are stored', inject([SessionService], (service: SessionService) => {
    lsGetItem.and.callFake((key) => {
      expect(key).toBe(LS_USER_SESSION, `should get ${LS_USER_SESSION}`);
      return '';
    });

    expect(service.getSession()).toBeNull();
    cleanup(service);
  }));

  it('should login the user', inject([SessionService, Store], (service: SessionService, store: Store<any>) => {
    const toSave = new Session({
      token: 'tokenValue',
      user_id: 42,
    });

    lsSetItem.and.callFake((key, pld: string) => {
      expect(key).toBe(LS_USER_SESSION, `should set ${LS_USER_SESSION}`);

      const session = new Session(JSON.parse(pld));
      expect(session.token).toBe(toSave.token);
      expect(session.userId).toBe(toSave.userId);
    });

    const dispatchSpy = spyOn(store, 'dispatch');
    service.signUserIn(toSave);

    const dispatchArg = <Action>dispatchSpy.calls.first().args[0];
    expect(dispatchArg.type).toBe(SIGN_IN, 'should dispatch the SIGN_IN action');
  }));
});
