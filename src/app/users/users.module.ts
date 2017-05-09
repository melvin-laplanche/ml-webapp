import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MdInputModule, MdCardModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// Router
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';

// Users components
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [SignUpComponent]
})
export class UsersModule { }
