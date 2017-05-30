import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MdInputModule, MdCardModule, MdButtonModule } from '@angular/material';
import { MdSnackBarModule, MdProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// Router
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';

import { CenteredBoxModule } from '../shared/centered-box';
import { HeaderModule } from '../shared/header';

// Guards & Components
import { SignInGuard, SignInComponent } from './sign-in';
import { SignUpGuard, SignUpComponent } from './sign-up';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdSnackBarModule,
    FlexLayoutModule,
    CenteredBoxModule,
    MdProgressBarModule,
    HeaderModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [SignUpComponent, SignInComponent, UsersComponent],
  providers: [SignUpGuard, SignInGuard]
})
export class UsersModule { }
