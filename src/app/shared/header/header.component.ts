import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  @Input() hasSearchBar = false;
  @Output() onMenuOpen = new EventEmitter();

  // Triggered when the user submit the search form
  @Output() onSearch = new EventEmitter<string>();

  searchForm: FormGroup;
  phoneSearchBarOpened = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  search() {
    this.onSearch.emit(this.searchForm.controls['query'].value)
  }
}
