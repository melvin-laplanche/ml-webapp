import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { appConfig } from '../../app.config';
import { UsersService } from '../users.service';

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
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    this.userApi.signIn({
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    }).subscribe(
      s => this.onSuccess(s),
      err => this.onFail(err)
      )
  }

  onSuccess(sess: any) {
    this.snackBar.open('Signed in', 'dismiss', appConfig.snackBarDefault);
    this.router.navigateByUrl('/');
  }

  onFail(err: Response) {
    this.snackBar.open('Invalid Credentials', 'dismiss', appConfig.snackBarDefault);
    this.submitted = false;
  }
}
