import { ButtonComponent } from '@/shared/components/button/button.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { AuthenticationService } from '@/shared/services/auth/authentication.service';
import { SignupRequest } from '@/shared/types';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import emailValidator from '../validators/email.validator';
import phoneNumberValidator from '../validators/phone-number.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);

  protected signupForm = this.formBuilder.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    telephoneNumber: ['', [Validators.required, phoneNumberValidator]],
  });

  protected isSignupFormValid = signal(false);

  private signupFormSubscription?: Subscription;

  private signupApiSubscription?: Subscription;

  ngOnInit(): void {
    this.subToFormValueChanges();
  }

  ngOnDestroy(): void {
    this.signupFormSubscription?.unsubscribe();
    this.signupApiSubscription?.unsubscribe();
  }

  private subToFormValueChanges() {
    this.signupFormSubscription = this.signupForm.valueChanges.subscribe(() =>
      this.signupForm.valid
        ? this.isSignupFormValid.set(true)
        : this.isSignupFormValid.set(false)
    );
  }

  protected async handleSignup() {
    const reqBody = this.signupForm.value as any as SignupRequest;

    reqBody.telephoneNumber = Number(reqBody.telephoneNumber);

    this.signupApiSubscription = this.authenticationService
      .signup(reqBody)
      .subscribe((r) => console.log(r));

    // await this.router.navigateByUrl(APP_ROUTES.SIGNIN);
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get emailNotProvided() {
    return this.emailControl?.touched && this.emailControl.hasError('required');
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get passwordNotProvided() {
    return (
      this.passwordControl?.touched && this.passwordControl.hasError('required')
    );
  }

  get firstNameControl() {
    return this.signupForm.get('firstName');
  }

  get firstNameNotProvided() {
    return (
      this.firstNameControl?.touched &&
      this.firstNameControl.hasError('required')
    );
  }

  get lastNameControl() {
    return this.signupForm.get('lastName');
  }

  get lastNameNotProvided() {
    return (
      this.lastNameControl?.touched && this.lastNameControl.hasError('required')
    );
  }

  get locationControl() {
    return this.signupForm.get('location');
  }

  get locationNotProvided() {
    return (
      this.locationControl?.touched && this.locationControl.hasError('required')
    );
  }

  get phoneControl() {
    return this.signupForm.get('telephoneNumber');
  }

  get phoneNotProvided() {
    return this.phoneControl?.touched && this.phoneControl.hasError('required');
  }
}
