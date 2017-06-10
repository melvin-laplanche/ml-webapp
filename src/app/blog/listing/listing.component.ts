import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../tools';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { openMenuAction } from '../../app.actions';

import { User } from '../../users';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent extends BaseComponent implements OnInit {
  public user: User;

  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  ngOnInit() {
    this.select('userData').subscribe((u: User) => {
      this.user = u;
    });
  }
}
