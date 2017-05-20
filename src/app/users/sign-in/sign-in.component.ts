import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { MdSnackBar } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SIGN_IN } from '../users.actions';

import { appConfig } from '../../app.config';

import { UsersService } from '../users.service';
import { Session } from '../models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder,
    private userApi: UsersService,
    private snackBar: MdSnackBar,
    private store: Store<AppState>
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    let session$ = this.userApi.signIn({
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    })

    session$.subscribe(
      s => this.onSuccess(s),
      err => this.onFail(err)
    )
  }

  onSuccess(sess: Session) {
    this.store.dispatch({ type: SIGN_IN })
    this.snackBar.open('logged in', 'dismiss', appConfig.snackBarDefault);
  }

  onFail(err: Response) {
    this.snackBar.open('Invalid Credentials', 'dismiss', appConfig.snackBarDefault);
    this.submitted = false;
  }
}
