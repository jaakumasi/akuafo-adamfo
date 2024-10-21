import { AbstractControl, ValidationErrors } from '@angular/forms';

export const emailValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const email = control.value;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;
  if (!emailRegex.test(email)) return { invalidEmail: true };
  return null;
};
