import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthType } from '../types';

const signinRoute = 'signin';
const signupRoute = 'signup';

@Injectable({
  providedIn: 'root',
})
export class AuthTypeService {
  private readonly authType = signal<AuthType>('signin');
  private readonly router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;

      const url = event.urlAfterRedirects;

      if (url.endsWith(signinRoute)) this.authType.set('signin');
      else if (url.endsWith(signupRoute)) this.authType.set('signup');
      else this.authType.set('other');
    });
  }

  public getAuthType(): AuthType {
    return this.authType();
  }

  public setAuthType(authType: AuthType) {
    this.authType.set(authType);
  }
}
