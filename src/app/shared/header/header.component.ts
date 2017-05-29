import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  @Input() hasSearchBar: boolean = true;
  @Output("onMenuOpen") onMenuOpen = new EventEmitter();

  // Triggered when the user submit the search form
  @Output("onSearch") onSearchEvent = new EventEmitter<string>();

  // Triggered each time the user update the search input
  @Output("onSearching") onSearchingEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  searchDataUpdated(event: KeyboardEvent) {
    const value = (<HTMLInputElement>event.target).value;

    if (event.keyCode == 13) {
      this.onSearchEvent.emit(value)
    } else {
      this.onSearchingEvent.emit(value)
    }
  }
}
