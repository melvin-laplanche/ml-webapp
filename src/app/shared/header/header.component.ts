import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  @Input() hasSearchBar: boolean = false;
  @Output("onMenuOpen") onMenuOpen = new EventEmitter();

  // Triggered when the user submit the search form
  @Output("onSearch") onSearchEvent = new EventEmitter<string>();

  // Triggered each time the user update the search input
  @Output("onSearching") onSearchingEvent = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSearch() {
    this.onSearchEvent.emit(this.searchForm.controls['query'].value)
  }
}
