import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { openMenuAction } from '../app.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  onMenuOpen() {
    this.store.dispatch(openMenuAction());
  }

}
