import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Module needed

import { MdToolbarModule } from '@angular/material';

// stubs

import { Store } from '@ngrx/store';
class StoreStub {
  dispatch(action: Action) { }

  select(path: string): Observable<boolean> {
    return Observable.of(false);
  }
}

import { UsersService } from '../users/users.service';
class UsersServiceStub {
  signOut() { }
}

// Tests

import { LeftDrawerComponent } from './left-drawer.component';
describe('LeftDrawerComponent', () => {
  let component: LeftDrawerComponent;
  let fixture: ComponentFixture<LeftDrawerComponent>;
  let menuState = new Subject();
  let userState = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeftDrawerComponent],
      imports: [
        MdToolbarModule
      ],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: UsersService, useClass: UsersServiceStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftDrawerComponent);
    component = fixture.componentInstance;

    menuState = new Subject();
    userState = new Subject();

    const store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'select').and.callFake((path: string) => {
      if (path === 'menuState') {
        return menuState;
      } else if (path === 'userState') {
        return userState;
      }
      return null;
    });

    fixture.detectChanges();
  });

  it('should close the menu', () => {
    let isClose = false;
    component.onClose.subscribe(() => {
      isClose = true;
    });
    menuState.next(false);
    expect(isClose).toBe(true, 'menu not didn\'t open');
  });

  it('should open the menu', () => {
    let isOpen = false;
    component.onOpen.subscribe(() => {
      isOpen = true;
    });
    menuState.next(true);
    expect(isOpen).toBe(true, 'menu not didn\'t open');
  });

  it('should close the menu', () => {
    let isClose = false;
    component.onClose.subscribe(() => {
      isClose = true;
    });
    menuState.next(false);
    expect(isClose).toBe(true, 'menu not didn\'t close');
  });

  it('should only show links for logged in user', () => {
    userState.next(true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.qa-sign-in'))).toBeFalsy('sign in button should NOT be visible');
    expect(fixture.debugElement.query(By.css('.qa-sign-up'))).toBeFalsy('sign up button should NOT be visible');
    expect(fixture.debugElement.query(By.css('.qa-sign-out'))).toBeTruthy('sign out button should be visible');
  });

  it('should only show links for logged out user', () => {
    userState.next(false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.qa-sign-in'))).toBeTruthy('sign in button should be visible');
    expect(fixture.debugElement.query(By.css('.qa-sign-up'))).toBeTruthy('sign up button should be visible');
    expect(fixture.debugElement.query(By.css('.qa-sign-out'))).toBeFalsy('sign out button should NOT be visible');
  });

  it('should log the user out and close the menu', () => {
    userState.next(true);
    fixture.detectChanges();

    let isClose = false;
    component.onClose.subscribe(() => {
      isClose = true;
    });

    const uService = fixture.debugElement.injector.get(UsersService);
    const signOutSpy = spyOn(uService, 'signOut').and.returnValue(Observable.of('fake data'));

    const el = fixture.debugElement.query(By.css('.qa-sign-out')).nativeElement
    el.click();
    fixture.detectChanges();

    expect(isClose).toBe(true, 'menu didn\'t close');
    expect(signOutSpy.calls.count()).toBe(1, 'user did not logged out');
  });
});
