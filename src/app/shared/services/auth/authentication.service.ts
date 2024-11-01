import { SIGNIN, SIGNUP } from '@/shared/constants';
import { SigninRequest, SignupRequest } from '@/shared/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);

  public signin(reqBody: SigninRequest) {
    return this.http.post(SIGNIN, reqBody);
  }

  public signup(reqbody: SignupRequest) {
    return this.http.post(SIGNUP, reqbody, 
    //   {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'ngrok-skip-browser-warning': 'skip-browser-warning',
    //   }),
    // }
  );
  }
}
