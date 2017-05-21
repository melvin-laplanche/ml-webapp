import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

// Guards
import { SignInGuard } from './sign-in/sign-in.guard';
import { SignUpGuard } from './sign-up/sign-up.guard';

export const usersRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignInGuard] },
];
