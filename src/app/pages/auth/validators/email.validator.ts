import { AbstractControl, ValidationErrors } from '@angular/forms';

const emailValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const email = control.value;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;
  if (!emailRegex.test(email)) return { invalidEmail: true };
  return null;
};

export default emailValidator
