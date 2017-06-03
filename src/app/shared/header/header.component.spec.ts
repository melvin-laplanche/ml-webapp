import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdButtonModule } from '@angular/material';
import { MdInputModule, MdIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdToolbarModule,
        MdInputModule,
        MdIconModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a search bar', () => {
    component.hasSearchBar = true;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.desktop-search-bar'));
    expect(el).toBeTruthy();
  });

  it('should NOT have a search bar', () => {
    component.hasSearchBar = false;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.desktop-search-bar'));
    expect(el).toBeFalsy();
  });

  it('should raise onMenuOpen event when clicked', () => {
    let menuIsOpen: boolean = false;
    component.onMenuOpen.subscribe(() => menuIsOpen = true);

    const menu = fixture.debugElement.query(By.css('.qa-menu-button'));
    menu.triggerEventHandler('click', null);
    expect(menuIsOpen).toBe(true);
  });

  it('should raise onSearchEvent event when a search occurs', () => {
    let searchData: string = "";
    component.onSearchEvent.subscribe((data: string) => searchData = data);

    const expectedData = "search query"
    component.searchForm.controls['query'].setValue(expectedData);
    component.onSearch()
    expect(searchData).toBe(expectedData);
  });
});
