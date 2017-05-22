import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { SessionService } from './session/session.service';
import { UsersService } from './users/users.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userState$: Observable<boolean>

  constructor(
    private store: Store<AppState>,
    private sessionService: SessionService, // needed to auto-login the user
    private usersService: UsersService
  ) {
    this.userState$ = this.store.select('userState');
  }

  ngOnInit() {
  }

  signOut() {
    this.usersService.signOut().subscribe()
  }
}
