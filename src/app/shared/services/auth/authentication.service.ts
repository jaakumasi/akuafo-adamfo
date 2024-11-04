import {
  EMAIL_VERIFICATION,
  LOCAL_STORAGE_KEYS,
  SIGNIN,
  SIGNUP
} from '@/shared/constants';
import { SigninRequest, SignupRequest } from '@/shared/types';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);

  public signin(reqBody: SigninRequest) {
    return this.http.post(SIGNIN, reqBody);
  }

  public signup(reqbody: SignupRequest) {
    return this.http.post(SIGNUP, reqbody);
  }

  public verifyEmail(otp: string) {
    const verificationId = this.localStorageService.getLocalItem(
      LOCAL_STORAGE_KEYS.USER_ID
    );

    const params = new URLSearchParams();

    params.append('code', otp);
    params.append('id', verificationId);

    return this.http.patch(`${EMAIL_VERIFICATION}?${params.toString()}`, {});
  }
}
