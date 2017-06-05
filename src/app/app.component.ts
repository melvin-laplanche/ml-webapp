import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { closeMenuAction } from './left-drawer';

import { MdSidenav } from '@angular/material';

import { SessionService } from './session/session.service';
import { userUpdatedAction, signInAction } from './users/users.actions';
import { User } from './users/users.model';
import { UsersService } from './users/users.service';
import { BaseComponent } from './tools';

import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  public userState$: Observable<boolean>
  public userData$: Observable<User>

  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(
    protected store: Store<AppState>,
    private sessionService: SessionService,
    private usersService: UsersService
  ) {
    super(store);
    this.userState$ = this.select('userState');
    this.userData$ = this.select('userData');

    // Auto-login the user
    const sess = this.sessionService.getSession();
    if (sess != null) {
      this.store.dispatch(signInAction());
    }

    // This sub makes sure that when the user logs in/out, the userData gets
    // refreshed
    this.userState$.subscribe((isLogged) => {
      const session = this.sessionService.getSession()

      // technically session should _never_ be null if isLogged is true,
      // but hey, let's play it safe
      if (!isLogged || session == null) {
        this.store.dispatch(userUpdatedAction(null));
      } else {
        this.usersService.refreshUserData(session.userId).subscribe()
      }
    });
  }

  ngOnInit() {
    // dispatch the close menu action when the menu is closed
    this.sidenav.onClose.takeWhile(() => this._isActive).subscribe(() => {
      this.store.dispatch(closeMenuAction());
    });
  }
}
