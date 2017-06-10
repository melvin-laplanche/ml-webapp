import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ArticlesComponent } from '../articles'
import { MdIconModule } from '@angular/material'

import { User } from '../../users'

// Stubs

import { Router } from '@angular/router'
class RouterStub {
  navigateByUrl(url: string) { return url }
}

import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'
class StoreStub {
  dispatch(action: Action) { }
  select(path: string) { }
}

// Tests

import { ListingComponent } from './listing.component'
describe('ListingComponent', () => {
  let component: ListingComponent
  let fixture: ComponentFixture<ListingComponent>
  let userState: Subject<User>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListingComponent, ArticlesComponent],
      imports: [MdIconModule],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: Router, useClass: RouterStub },
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent)
    component = fixture.componentInstance
    userState = new Subject()
    const store = fixture.debugElement.injector.get(Store)
    spyOn(store, 'select').and.returnValue(userState)
    fixture.detectChanges()
  })

  it('should NOT have the "create article" fab for logged out user', () => {
    userState.next(null)
    fixture.detectChanges()

    const fab = fixture.debugElement.query(By.css('.add-new-article'))
    expect(fab).toBeFalsy()
  })

  it('should NOT have the "create article" fab for logged in user', () => {
    const user = new User({
      id: 'xxx-yyy-zzz',
      name: 'username',
      email: 'whatever@domain.tld',
    })

    userState.next(user)
    fixture.detectChanges()

    const fab = fixture.debugElement.query(By.css('.add-new-article'))
    expect(fab).toBeFalsy()
  })

  it('should have the "create article" fab for logged in admin', () => {
    const user = new User({
      id: 'xxx-yyy-zzz',
      name: 'username',
      email: 'whatever@domain.tld',
      is_admin: true,
    })

    userState.next(user)
    fixture.detectChanges()

    const fab = fixture.debugElement.query(By.css('.add-new-article'))
    expect(fab).toBeTruthy()
  })
})
