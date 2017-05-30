import { Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/takeWhile";

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
})
export class BaseComponent implements OnDestroy {
  protected _isActive: boolean = true;

  constructor(
    protected store: Store<AppState>
  ) {

  }

  select(path: string): Observable<{}> {
    return this.store.select(path).takeWhile(() => this._isActive);
  }

  subscribe(observable: Observable<{}>) {
    return observable.takeWhile(() => this._isActive)
  }

  ngOnDestroy() {
    this._isActive = false;
  }
}
