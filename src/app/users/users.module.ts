import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MdInputModule, MdCardModule, MdButtonModule } from '@angular/material';
import { MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// Router
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';

// Users components
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersService } from './users.service';

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
    FlexLayoutModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [SignUpComponent],
  providers: [UsersService]
})
export class UsersModule { }
