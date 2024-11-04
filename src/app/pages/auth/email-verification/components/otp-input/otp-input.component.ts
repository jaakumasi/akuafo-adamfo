import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'otp-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
})
export class OtpInputComponent {
  otpReadyStateEmitter = output<boolean>();
  otpReady = signal(false);

  otpInput1 = '';
  otpInput2 = '';
  otpInput3 = '';
  otpInput4 = '';
  otpInput5 = '';
  otpInput6 = '';
  inputRegex = /\d/;

  onOtpChange(value: string, ref: HTMLInputElement | null) {
    const matches = this.inputRegex.test(value);
    if (matches && ref) ref.focus();

    if (
      this.inputRegex.test(this.otpInput1) &&
      this.inputRegex.test(this.otpInput2) &&
      this.inputRegex.test(this.otpInput3) &&
      this.inputRegex.test(this.otpInput4) &&
      this.inputRegex.test(this.otpInput5) &&
      this.inputRegex.test(this.otpInput6)
    ) {
      this.otpReady.set(true);
      this.otpReadyStateEmitter.emit(true);
    } else {
      this.otpReady.set(false);
      this.otpReadyStateEmitter.emit(false);
    }
  }
}
