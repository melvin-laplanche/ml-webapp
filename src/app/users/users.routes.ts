import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

// Guards
import { SignInGuard, SignInComponent } from './sign-in';
import { SignUpGuard, SignUpComponent } from './sign-up';

export const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpGuard] },
      { path: 'sign-in', component: SignInComponent, canActivate: [SignInGuard] },
    ]
  }
];
