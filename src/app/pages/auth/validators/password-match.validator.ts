import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (confirmPassword?.dirty && password?.value !== confirmPassword.value)
    return { passwordMismatch: true };
  return null;
};
