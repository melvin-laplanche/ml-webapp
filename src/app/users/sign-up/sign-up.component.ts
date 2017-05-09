import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-blog-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup
  submitted = false

  constructor(private fb: FormBuilder) {
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
    this.submitted = false;
  }
}
