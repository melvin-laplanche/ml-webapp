import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
class StoreStub {
  select(state: string): Observable<boolean> {
    return Observable.of(false);
  }
}

import { SignUpGuard } from './sign-up.guard';

describe('SignUpGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignUpGuard,
        { provide: Store, useClass: StoreStub },
      ]
    });
  });

  it('Should NOT active when the user is logged in', inject([SignUpGuard, Store], (guard: SignUpGuard, store: Store<any>) => {
    const spy = spyOn(store, 'select').and.returnValue(Observable.of(true));

    (<Observable<boolean>>guard.canActivate(null, null)).subscribe((isActive: boolean) => {
      expect(isActive).toBeFalsy();
    })
  }));

  it('Should active when the user is NOT logged in', inject([SignUpGuard, Store], (guard: SignUpGuard, store: Store<any>) => {
    const spy = spyOn(store, 'select').and.returnValue(Observable.of(false));

    (<Observable<boolean>>guard.canActivate(null, null)).subscribe((isActive: boolean) => {
      expect(isActive).toBeTruthy();
    })
  }));
});