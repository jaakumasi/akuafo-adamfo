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
import { UserDetailsStateService } from '@/shared/state/user-details.service';
import { SigninRequest, UserDetails } from '@/shared/types';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import emailValidator from '../validators/email.validator';

interface SigninResponse {
  data: UserDetails;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastSetupService = inject(ToastSetupService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly userDetailsStateService = inject(UserDetailsStateService);

  protected signinForm = this.formBuilder.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
  });

  protected isSigninFormValid = signal(false);

  protected isMakingApiCall = signal(false);

  private signinFormSubscription?: Subscription;
  private signinApiSubscription?: Subscription;

  ngOnInit(): void {
    this.signinFormSubscription = this.signinForm.valueChanges.subscribe(() =>
      this.signinForm.valid
        ? this.isSigninFormValid.set(true)
        : this.isSigninFormValid.set(false)
    );
  }

  ngOnDestroy(): void {
    this.signinFormSubscription?.unsubscribe();
    this.signinApiSubscription?.unsubscribe();
  }

  protected async handleLogin() {
    // mock user details state update
    // this.userDetailsService.updateUserDetails({
    //   email: this.emailControl?.value!,
    //   name: 'Matty Mullins',
    //   profilePicUrl:
    //     'data:image/jpeg;base64,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',
    // });
    const reqBody = this.signinForm.value as SigninRequest;

    this.onRequestStart();

    this.signinApiSubscription = this.authenticationService
      .signin(reqBody)
      .subscribe({
        next: (response) => {
          this.handleSigninSuccess(response);
        },
        error: (error) => this.handleSigninError(error),
      });
  }

  private onRequestStart() {
    this.isMakingApiCall.set(true);
  }

  private onRequestEnd() {
    this.isMakingApiCall.set(false);
  }

  private async handleSigninSuccess(response: unknown) {
    this.onRequestEnd();

    this.persistUserDetails(response as SigninResponse);

    await this.router.navigateByUrl(APP_ROUTES.HOME);
  }

  private persistUserDetails(response: SigninResponse) {
    this.localStorageService.setLocalItem(
      LOCAL_STORAGE_KEYS.USER,
      response.data
    );

    this.userDetailsStateService.updateUserDetails(response.data);
  }

  private handleSigninError(error: HttpErrorResponse) {
    this.onRequestEnd();

    const errorMessage = error.error.message;

    this.toastSetupService.setupToast(
      true,
      errorMessage ? errorMessage[0] : TOAST_MESSAGES.NETWORK_ERROR,
      'error'
    );
  }

  get emailControl() {
    return this.signinForm.get('email');
  }

  get emailNotProvided() {
    return this.emailControl?.touched && this.emailControl.hasError('required');
  }

  get emailInvalid() {
    return this.emailControl?.touched && this.emailControl.invalid;
  }

  get passwordControl() {
    return this.signinForm.get('password');
  }

  get passwordNotProvided() {
    return (
      this.passwordControl?.touched && this.passwordControl.hasError('required')
    );
  }
}
