import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { MdSnackBar } from '@angular/material';
import { appConfig } from '../../app.config';

import { UsersService } from '../users.service';
import { User } from '../users.model';

@Component({
  selector: 'app-blog-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder,
    private userApi: UsersService,
    private snackBar: MdSnackBar,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.signUpForm.addControl('passwordAgain',
      new FormControl('', [CustomValidators.equalTo(this.signUpForm.controls.password)]))
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    let user$ = this.userApi.signUp({
      name: this.signUpForm.controls['name'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
    })

    user$.subscribe(
      u => this.onSuccess(u),
      err => this.onFail(err)
    )
  }

  onSuccess(err: User) {
    this.snackBar.open('Account created', 'dismiss', appConfig.snackBarDefault);

    this.userApi.signIn({
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
    }).subscribe(
      session => this.router.navigateByUrl('/'),
      err => this.router.navigateByUrl('/users/sign-in')
      )
  }

  onFail(err: Response) {
    this.snackBar.open('Something wrong happened', 'dismiss', appConfig.snackBarDefault);
    this.submitted = false;
  }
}
