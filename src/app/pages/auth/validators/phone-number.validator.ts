import { AbstractControl, ValidationErrors } from '@angular/forms';

const phoneNumberValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const phoneNumber = control.get('phone')?.value;

  const phonePattern = /^0[0-9]{9}$/;

  if (phoneNumber?.touched && phonePattern.test(phoneNumber))
    return { phoneNumber: true };
  return null;
};

export default phoneNumberValidator;
