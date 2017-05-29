import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MdSidenav } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { closeMenuAction } from './left-drawer.actions';

import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';

import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-left-drawer',
  templateUrl: './left-drawer.component.html',
  styleUrls: ['./left-drawer.component.scss']
})
export class LeftDrawerComponent implements OnInit {
  public userState$: Observable<boolean>;
  public menuState$: Observable<boolean>;
  @Input() sidenav: MdSidenav;

  private _active: boolean = true;

  constructor(
    private store: Store<AppState>,
    private usersService: UsersService
  ) {
    this.userState$ = this.store.select('userState').takeWhile(() => this._active);
    this.menuState$ = this.store.select('menuState').takeWhile(() => this._active);
  }

  ngOnInit() {
    this.sidenav.onClose.takeWhile(() => this._active).subscribe(() => {
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

  OnDestroy() {
    this._active = false;
  }

  signOut() {
    this.usersService.signOut().subscribe()
  }
}
