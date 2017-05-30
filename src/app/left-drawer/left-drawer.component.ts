import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MdSidenav } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { closeMenuAction } from './left-drawer.actions';

import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { BaseComponent } from '../tools';

import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-left-drawer',
  templateUrl: './left-drawer.component.html',
  styleUrls: ['./left-drawer.component.scss']
})
export class LeftDrawerComponent extends BaseComponent implements OnInit {
  public userState$: Observable<boolean>;
  public menuState$: Observable<boolean>;
  @Input() sidenav: MdSidenav;

  constructor(
    protected store: Store<AppState>,
    private usersService: UsersService
  ) {
    super(store);
    this.userState$ = this.select('userState');
    this.menuState$ = this.select('menuState');
  }

  ngOnInit() {
    this.sidenav.onClose.takeWhile(() => this._isActive).subscribe(() => {
      this.store.dispatch(closeMenuAction());
    });

    this.menuState$.subscribe((isOpen) => {
      if (isOpen) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });
  }

  signOut() {
    this.usersService.signOut().subscribe()
  }
}
