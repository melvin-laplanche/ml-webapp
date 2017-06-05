import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MdSidenav } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { BaseComponent } from '../tools';

import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-left-drawer',
  templateUrl: './left-drawer.component.html',
  styleUrls: ['./left-drawer.component.scss']
})
export class LeftDrawerComponent extends BaseComponent implements OnInit {
  public userState$: Observable<boolean>;
  public menuState$: Observable<boolean>;

  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();

  isLogged = false;

  constructor(
    protected store: Store<AppState>,
    private usersService: UsersService
  ) {
    super(store);
  }

  ngOnInit() {
    this.userState$ = this.select('userState');
    this.menuState$ = this.select('menuState');

    this.userState$.subscribe((v) => {
      this.isLogged = v;
    })

    this.menuState$.subscribe((isOpen) => {
      if (isOpen) {
        this.onOpen.emit();
      } else {
        this.onClose.emit()
      }
    });
  }

  signOut() {
    this.usersService.signOut().subscribe()
  }
}
