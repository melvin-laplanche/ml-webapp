import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { SessionService } from './session/session.service';
import { userUpdatedAction } from './users/users.actions';
import { User } from './users/users.model';
import { UsersService } from './users/users.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userState$: Observable<boolean>
  public userData$: Observable<User>

  constructor(
    private store: Store<AppState>,
    private sessionService: SessionService, // needed to auto-login the user
    private usersService: UsersService
  ) {
    this.userState$ = this.store.select('userState');
    this.userData$ = this.store.select('userData');

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
    })
  }

  ngOnInit() {
  }

  signOut() {
    this.usersService.signOut().subscribe()
  }
}
