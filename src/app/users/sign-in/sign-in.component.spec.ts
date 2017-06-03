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

import { SignInComponent } from './sign-in.component';

import { Observable } from 'rxjs/Observable';
import { UsersService, SignInParams } from '../users.service';

class UsersServiceStub {
  signIn(data: SignInParams): Observable<any> {
    if (data.email == 'trigger.failure@domain.tld') {
      return Observable.throw('err');
    } else {
      return Observable.of("data");
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

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
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

  const setEmail = (value: string) => {
    const email = fixture.debugElement.query(By.css('.qa-email')).nativeElement
    email.value = value;
    email.dispatchEvent(new Event('input'));
    expect(component.signInForm.controls['email'].value).toBe(value,
      'The email model to have the same value as in the template');
  }

  const setPassword = (value: string) => {
    const psw = fixture.debugElement.query(By.css('.qa-password')).nativeElement
    psw.value = value;
    psw.dispatchEvent(new Event('input'));
    expect(component.signInForm.controls['password'].value).toBe(value,
      'The password model to have the same value as in the template');
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

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be possible to submit an invalid form', () => {
    expect(component.signInForm.pristine).toBe(true, 'Form should be pristine by default');
    expect(component.signInForm.invalid).toBe(true, 'Form should be invalid by default');

    expect(isSubmitDisabled()).toBe(true, 'No data were set');

    setEmail('invalid email')
    expect(isSubmitDisabled()).toBe(true, 'Only an invalid email is set');

    setEmail('valid@email.tld')
    expect(isSubmitDisabled()).toBe(true, 'Only a valid email is set');

    setPassword('valid')
    expect(isSubmitDisabled()).toBe(false, 'All data are correctly set');

    // Cleanup
    setEmail('')
    setPassword('')
    expect(isSubmitDisabled()).toBe(true, 'All data have been wiped');
  });

  it('should show an error on invalid email', () => {
    setEmail('invalid email')
    expect(component.signInForm.controls['email'].hasError('email')).toBe(true);

    // Cleanup
    setEmail('')
  });

  it('should connect the user and redirect to the homepage',
    inject([Router, MdSnackBar], (router: Router, snackBar: MdSnackBar) => {
      const routerSpy = spyOn(router, 'navigateByUrl');
      const snackSpy = spyOn(snackBar, 'open');

      setEmail('valid.email@domain.tld');
      setPassword('valid password');
      submitForm()
      fixture.detectChanges();

      const snackArgs = snackSpy.calls.first().args[0];
      expect(snackArgs).toBe('Signed in', 'Should display a success message');

      const navArgs = routerSpy.calls.first().args[0];
      expect(navArgs).toBe('/', 'should nav to the home page');

      // Cleanup
      setEmail('')
      setPassword('')
    }));

  it('should return a login error',
    inject([MdSnackBar], (snackBar: MdSnackBar) => {
      const snackSpy = spyOn(snackBar, 'open');

      setEmail('trigger.failure@domain.tld');
      setPassword('valid password');
      submitForm()
      fixture.detectChanges();

      const snackArgs = snackSpy.calls.first().args[0];
      expect(snackArgs).toBe('Invalid Credentials', 'Should display an error message');

      // Cleanup
      setEmail('')
      setPassword('')
    }));
});
