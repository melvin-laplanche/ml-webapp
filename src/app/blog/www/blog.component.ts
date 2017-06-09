import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { openMenuAction } from '../../app.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  onMenuOpen() {
    this.store.dispatch(openMenuAction());
  }

  onSearch(query: string) {
    console.log('searched: ' + query);
  }
}
