import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(private store: Store<AppState>) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // If the user is logged then we return false
    return this.store.select('userState').map((isLogged) => !isLogged)
  }
}
