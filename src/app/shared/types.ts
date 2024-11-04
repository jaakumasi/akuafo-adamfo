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

export interface UserDetails {
  fullName: string;
  email: string;
  userId: string;
  token: string;
  profileUrl?: string;
}

export interface ToastState {
  showToast: boolean;
  toastMessage: string;
  toastVariant: ToastVariant;
  timeout?: number;
};

export type ToastVariant = 'success' | 'error' | 'info';
