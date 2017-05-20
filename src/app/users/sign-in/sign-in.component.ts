import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { MdSnackBar } from '@angular/material';
import { UsersService } from '../users.service';
import { Session } from '../models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder,
    private userApi: UsersService,
    private snackBar: MdSnackBar
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit() {
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
    this.snackBar.open('logged in', 'dismiss');
  }

  onFail(err: Response) {
    this.snackBar.open('Invalid Credentials', 'dismiss');
    this.submitted = false;
  }
}
