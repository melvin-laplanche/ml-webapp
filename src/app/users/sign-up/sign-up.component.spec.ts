import { Response, ResponseOptions, Headers } from '@angular/http';
import { tick, async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdCardModule, MdButtonModule } from '@angular/material';
import { MdSnackBarModule, MdProgressBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CenteredBoxModule } from '../../shared/centered-box';
import { HeaderModule } from '../../shared/header';

import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { UsersService, SignUpParams, SignInParams } from '../users.service';

import { ApiError } from '../../tools/api';

import { SignUpComponent } from './sign-up.component';

class UsersServiceStub {
  private fakeConflictResponse = new Response(new ResponseOptions({
    body: '{}',
    status: 409,
    headers: new Headers(),
  }));

  private fakeInternalErrorResponse = new Response(new ResponseOptions({
    body: '{}',
    status: 500,
    headers: new Headers(),
  }));

  signIn(data: SignUpParams): Observable<any> {
    if (data.email === TRIGGER_SIGN_IN_FAILURE) {
      return Observable.throw('err');
    } else {
      return Observable.of('success');
    }
  }

  signUp(data: SignUpParams): Observable<any> {
    if (data.email === TRIGGER_EMAIL_CONFLICT) {
      return Observable.throw(new ApiError(this.fakeConflictResponse));
    } else if (data.email === TRIGGER_SERVER_ERROR) {
      return Observable.throw(new ApiError(this.fakeInternalErrorResponse));
    } {
      return Observable.of('success');
    }
  }
}

class MdSnackBarStub {
  open(title: string, action: string, opt: any) {

  }
}

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

const TRIGGER_EMAIL_CONFLICT = 'trigger.conflict@domain.tld';
const TRIGGER_SERVER_ERROR = 'trigger.server.error@domain.tld';
const TRIGGER_FULL_SUCCESS = 'valid@domain.tld';
const TRIGGER_SIGN_IN_FAILURE = 'trigger.failure@domain.tld';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MdProgressBarModule,
        MdInputModule,
        CenteredBoxModule,
      ],
      providers: [
        { provide: UsersService, useClass: UsersServiceStub },
        { provide: MdSnackBar, useClass: MdSnackBarStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  const setName = (value: string) => {
    const name = fixture.debugElement.query(By.css('.qa-name')).nativeElement
    name.value = value;
    name.dispatchEvent(new Event('input'));
    expect(component.signUpForm.controls['name'].value).toBe(value,
      'The name model to have the same value as in the template');
  }

  const setEmail = (value: string) => {
    const email = fixture.debugElement.query(By.css('.qa-email')).nativeElement
    email.value = value;
    email.dispatchEvent(new Event('input'));
    expect(component.signUpForm.controls['email'].value).toBe(value,
      'The email model to have the same value as in the template');
  }

  const setPassword = (value: string) => {
    const psw = fixture.debugElement.query(By.css('.qa-password')).nativeElement
    psw.value = value;
    psw.dispatchEvent(new Event('input'));
    expect(component.signUpForm.controls['password'].value).toBe(value,
      'The password model to have the same value as in the template');
  }

  const setPasswordAgain = (value: string) => {
    const psw = fixture.debugElement.query(By.css('.qa-password-again')).nativeElement
    psw.value = value;
    psw.dispatchEvent(new Event('input'));
    expect(component.signUpForm.controls['passwordAgain'].value).toBe(value,
      'The passwordAgain model to have the same value as in the template');
  }

  const isSubmitDisabled = (): boolean => {
    fixture.detectChanges();
    const submit = fixture.debugElement.query(By.css('.qa-submit'))
    return submit.properties['disabled']
  }

  const submitForm = () => {
    fixture.detectChanges();
    const submit = fixture.debugElement.query(By.css('.qa-submit'))
    submit.nativeElement.click();
  }

  const cleanup = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPasswordAgain('')
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be possible to submit an invalid form', () => {
    expect(component.signUpForm.pristine).toBe(true, 'Form should be pristine by default');
    expect(component.signUpForm.invalid).toBe(true, 'Form should be invalid by default');

    expect(isSubmitDisabled()).toBe(true, 'No data were set');

    setName('valid name');

    setEmail('invalid email');
    expect(isSubmitDisabled()).toBe(true, 'Invalid email is set');

    setEmail('valid@email.tld');
    expect(isSubmitDisabled()).toBe(true, 'Only a valid email and a name are set');

    setPassword('valid');
    expect(isSubmitDisabled()).toBe(true, 'PasswordAgain not set');

    setPasswordAgain('not valid');
    expect(isSubmitDisabled()).toBe(true, 'PasswordAgain not set');

    setPasswordAgain('valid');
    expect(isSubmitDisabled()).toBe(false, 'Everything is set correctly');

    cleanup();
    expect(isSubmitDisabled()).toBe(true, 'All data have been wiped');
  });

  it('should show an error on invalid email', () => {
    setEmail('invalid email')
    expect(component.signUpForm.controls['email'].hasError('email')).toBe(true);

    cleanup();
  })

  it('should show an error on non matching password', () => {
    setPassword('password')
    expect(component.signUpForm.controls['passwordAgain'].hasError('equalTo')).toBe(true);

    setPasswordAgain('not password')
    expect(component.signUpForm.controls['passwordAgain'].hasError('equalTo')).toBe(true);

    cleanup();
  })

  it('should display a snackBar upon server error',
    inject([MdSnackBar], (snackBar: MdSnackBar) => {
      const snackSpy = spyOn(snackBar, 'open');

      setName('name');
      setEmail(TRIGGER_SERVER_ERROR);
      setPassword('password');
      setPasswordAgain('password');
      submitForm()
      fixture.detectChanges();

      const snackArgs = snackSpy.calls.first().args[0];
      expect(snackArgs).toBe('Something wrong happened', 'Should display an error message');

      cleanup();
    }));

  it('should return a email conflict on sign up', () => {
    setName('name');
    setEmail(TRIGGER_EMAIL_CONFLICT);
    setPassword('password');
    setPasswordAgain('password');
    submitForm()
    fixture.detectChanges();

    expect(component.signUpForm.controls['email'].hasError('conflict')).toBe(true);

    cleanup();
  });

  it('should create the user and redirect to the sign in page',
    inject([Router, MdSnackBar], (router: Router, snackBar: MdSnackBar) => {
      const routerSpy = spyOn(router, 'navigateByUrl');
      const snackSpy = spyOn(snackBar, 'open');

      setName('name');
      setEmail(TRIGGER_SIGN_IN_FAILURE);
      setPassword('valid password');
      setPasswordAgain('valid password');
      submitForm();
      fixture.detectChanges();

      const snackArgs = snackSpy.calls.first().args[0];
      expect(snackArgs).toBe('Account created', 'Should display a success message');

      const navArgs = routerSpy.calls.first().args[0];
      expect(navArgs).toBe('/users/sign-in', 'should nav to the sign in page');

      cleanup();
    }));

  it('should create the user and redirect to the home page',
    inject([Router, MdSnackBar], (router: Router, snackBar: MdSnackBar) => {
      const routerSpy = spyOn(router, 'navigateByUrl');
      const snackSpy = spyOn(snackBar, 'open');

      setName('name');
      setEmail(TRIGGER_FULL_SUCCESS);
      setPassword('valid password');
      setPasswordAgain('valid password');
      submitForm();
      fixture.detectChanges();

      const snackArgs = snackSpy.calls.first().args[0];
      expect(snackArgs).toBe('Account created', 'Should display a success message');

      const navArgs = routerSpy.calls.first().args[0];
      expect(navArgs).toBe('/', 'should nav to the sign in page');

      cleanup();
    }));
});
