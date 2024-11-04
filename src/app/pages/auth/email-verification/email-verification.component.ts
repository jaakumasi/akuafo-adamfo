import { ButtonComponent } from '@/shared/components/button/button.component';
import { AuthenticationService } from '@/shared/services/auth/authentication.service';
import { Component, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OtpInputComponent } from './components/otp-input/otp-input.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastSetupService } from '@/shared/services/toast-setup.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@/shared/constants';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [ButtonComponent, OtpInputComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss',
})
export class EmailVerificationComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastSetupService = inject(ToastSetupService);

  @ViewChild(OtpInputComponent) otpInput!: OtpInputComponent;

  protected isVerifyButtonDisabled = signal(true);

  protected isMakingApiCall = signal(false);

  private otpVerificationApiSubscription?: Subscription;

  ngOnDestroy(): void {
    this.otpVerificationApiSubscription?.unsubscribe();
  }

  protected onOTPReady(state: boolean) {
    state
      ? this.isVerifyButtonDisabled.set(false)
      : this.isVerifyButtonDisabled.set(true);
  }

  private getOTP() {
    return (
      this.otpInput.otpInput1 +
      this.otpInput.otpInput2 +
      this.otpInput.otpInput3 +
      this.otpInput.otpInput4 +
      this.otpInput.otpInput5 +
      this.otpInput.otpInput6
    );
  }

  protected handleOTPVerification() {
    const otp = this.getOTP();

    this.onRequestStart();

    this.otpVerificationApiSubscription = this.authenticationService
      .verifyEmail(otp)
      .subscribe({
        next: () => this.handleVerificationSuccess(),
        error: (error) => this.handleVerificationError(error),
      });
  }

  private async handleVerificationSuccess() {
    this.onRequestEnd();

    this.toastSetupService.setupToast(
      true,
      'Email verified successfully',
      'success'
    );

    await this.router.navigateByUrl(APP_ROUTES.SIGNIN);
  }

  private handleVerificationError(error: HttpErrorResponse) {
    this.onRequestEnd();

    const errorMessage = error.error.message[0];

    this.toastSetupService.setupToast(true, errorMessage, 'error');
  }

  private onRequestStart() {
    this.isMakingApiCall.set(true);
  }

  private onRequestEnd() {
    this.isMakingApiCall.set(false);
  }
}
