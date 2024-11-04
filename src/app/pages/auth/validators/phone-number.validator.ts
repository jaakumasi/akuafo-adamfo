import { AbstractControl, ValidationErrors } from '@angular/forms';

const phoneNumberValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const phoneNumber = control.value;
  const phonePattern = /^0\d{9}$/;
  if (!phonePattern.test(phoneNumber)) return { invalidPhoneNumber: true };
  return null;
};

export default phoneNumberValidator;
