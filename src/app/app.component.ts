import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './app.state';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userState$: Observable<boolean>

  constructor(private store: Store<AppState>) {
    this.userState$ = this.store.select('userState');
  }

  ngOnInit() {

  }
}
