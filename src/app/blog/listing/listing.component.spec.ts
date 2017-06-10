import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ArticlesComponent } from '../articles'
import { MdIconModule } from '@angular/material'

import { User } from '../../users'

// Stubs

import { Directive, Input, HostListener, DebugElement } from '@angular/core'
@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input() routerLink: any
  navigatedTo: any = null

  @HostListener('click') onClick() {
    this.navigatedTo = this.routerLink
  }
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
  let linkElements: DebugElement[]
  let links: RouterLinkStubDirective[]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListingComponent,
        ArticlesComponent,
        RouterLinkStubDirective,
      ],
      imports: [MdIconModule],
      providers: [
        { provide: Store, useClass: StoreStub },
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent)
    component = fixture.componentInstance

    // mock the store
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

  it('should redirect the user to the "add article" page', () => {
    const user = new User({
      id: 'xxx-yyy-zzz',
      name: 'username',
      email: 'whatever@domain.tld',
      is_admin: true,
    })

    userState.next(user)
    fixture.detectChanges()

    linkElements = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective))
    links = linkElements
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective)

    const fab = fixture.debugElement.query(By.css('.add-new-article')).nativeElement
    fab.click()
    fixture.detectChanges()

    console.log(links);
    expect(links[0].navigatedTo).toBe('/blog/add', 'should have navigated to /blog/add')
  })
})
