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

import { CenteredBoxModule } from '../shared/centered-box/centered-box.module';

// Guards
import { SignInGuard } from './sign-in/sign-in.guard';
import { SignUpGuard } from './sign-up/sign-up.guard';

// Users components
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersService } from './users.service';
import { SignInComponent } from './sign-in/sign-in.component';


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
  ],
  exports: [
    RouterModule
  ],
  declarations: [SignUpComponent, SignInComponent],
  providers: [UsersService, SignUpGuard, SignInGuard]
})
export class UsersModule { }
