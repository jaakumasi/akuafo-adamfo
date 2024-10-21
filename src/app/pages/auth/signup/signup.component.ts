import { ButtonComponent } from '@/shared/components/button/button.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emailValidator } from '../validators/email.validator';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@/shared/components/constants';

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

  protected signupForm = this.formBuilder.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  protected isSignupFormValid = signal(false);

  private signupFormSubscription?: Subscription;

  ngOnInit(): void {
    this.subToFormValueChanges();
    this.addPasswordMatchValidator();
  }

  ngOnDestroy(): void {
    this.signupFormSubscription?.unsubscribe();
  }

  private subToFormValueChanges() {
    this.signupFormSubscription = this.signupForm.valueChanges.subscribe(() =>
      this.signupForm.valid
        ? this.isSignupFormValid.set(true)
        : this.isSignupFormValid.set(false)
    );
  }

  private addPasswordMatchValidator() {
    this.signupForm.addValidators(passwordMatchValidator);
  }

  protected async handleSignup() {
    // TODO: signup request

    await this.router.navigateByUrl(APP_ROUTES.SIGNIN);
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

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }

  get passwordNotProvided() {
    return (
      this.passwordControl?.touched && this.passwordControl.hasError('required')
    );
  }

  get passwordMismatch() {
    return (
      this.confirmPasswordControl?.touched &&
      this.signupForm.hasError('passwordMismatch')
    );
  }
}
