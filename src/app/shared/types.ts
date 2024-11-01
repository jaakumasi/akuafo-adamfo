export type AuthType = 'signin' | 'signup' | 'other';

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  telephoneNumber: number;
}
