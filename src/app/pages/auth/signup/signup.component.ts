import { ButtonComponent } from '@/shared/components/button/button.component';
import { InputComponent } from '@/shared/components/input/input.component';
import {
  APP_ROUTES,
  LOCAL_STORAGE_KEYS,
  TOAST_MESSAGES,
} from '@/shared/constants';
import { AuthenticationService } from '@/shared/services/auth/authentication.service';
import { LocalStorageService } from '@/shared/services/local-storage.service';
import { ToastSetupService } from '@/shared/services/toast-setup.service';
import { SignupRequest } from '@/shared/types';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import emailValidator from '../validators/email.validator';
import passwordValidator from '../validators/password.validator';
import phoneNumberValidator from '../validators/phone-number.validator';

interface SignupResponse {
  data: { id: string };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastSetupService = inject(ToastSetupService);
  private readonly localStorageService = inject(LocalStorageService);

  protected signupForm = this.formBuilder.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, passwordValidator]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    telephoneNumber: ['', [Validators.required, phoneNumberValidator]],
  });

  protected isSignupFormValid = signal(false);

  protected isMakingApiCall = signal(false);

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

    this.onRequestStart();

    this.signupApiSubscription = this.authenticationService
      .signup(reqBody)
      .subscribe({
        next: (response) => {
          this.handleSignupSuccess(response);
        },
        error: (error) => this.handleSingupError(error),
      });
  }

  private onRequestStart() {
    this.isMakingApiCall.set(true);
  }

  private onRequestEnd() {
    this.isMakingApiCall.set(false);
  }

  private async handleSignupSuccess(response: unknown) {
    this.onRequestEnd();

    const verificationId = (response as SignupResponse).data.id;

    this.localStorageService.setLocalItem(
      LOCAL_STORAGE_KEYS.USER_ID,
      verificationId
    );

    this.toastSetupService.setupToast(
      true,
      'A token has been sent to your mail',
      'success',
      4000
    );

    await this.router.navigateByUrl(APP_ROUTES.EMAIL_VERIFICATION);
  }

  private handleSingupError(error: HttpErrorResponse) {
    this.onRequestEnd();

    const errorMessage = error.error.message;

    this.toastSetupService.setupToast(
      true,
      errorMessage ? errorMessage[0] : TOAST_MESSAGES.NETWORK_ERROR,
      'error'
    );
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get emailNotProvided() {
    return this.emailControl?.touched && this.emailControl.hasError('required');
  }

  get emailInvalid() {
    return (
      this.emailControl?.touched &&
      this.emailControl.hasError('invalidEmailPattern')
    );
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get passwordNotProvided() {
    return (
      this.passwordControl?.touched && this.passwordControl.hasError('required')
    );
  }

  get passwordCriteriaMismatch() {
    return (
      this.passwordControl?.touched &&
      this.passwordControl.hasError('passwordCriteriaMismatch')
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

  get phoneNumberInvalid() {
    return (
      this.phoneControl?.touched &&
      this.phoneControl.hasError('invalidPhoneNumber')
    );
  }
}
