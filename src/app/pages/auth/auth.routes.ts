import { Route } from '@angular/router';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

export const AuthRoutes: Route[] = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify', component: EmailVerificationComponent },
];
