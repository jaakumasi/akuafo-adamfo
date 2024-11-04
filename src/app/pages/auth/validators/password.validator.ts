import { AbstractControl, ValidationErrors } from '@angular/forms';

const passwordValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.value;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  if (!passwordRegex.test(password)) return { passwordCriteriaMismatch: true };
  return null;
};

export default passwordValidator;
