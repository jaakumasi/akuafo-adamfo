export const APP_ROUTES = {
  // auth
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  EMAIL_VERIFICATION: '/auth/verify',

  // home
  HOME: '/home',
};

/* Local Storage Keys */
export const LOCAL_STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  USER_ID: 'id-user'
};

/* Session Storage Keys */
export const SESSION_STORAGE_KEYS = {
}

export const DEFAULT_TOAST_TIMEOUT = 3000;

export const SERVER_URL = 'https://famous-foal-lately.ngrok-free.app';
export const CONTEXT_PATH = 'v1';

/* Auth Endpoints */
export const SIGNIN = `${SERVER_URL}/${CONTEXT_PATH}/auth/login`;
export const SIGNUP = `${SERVER_URL}/${CONTEXT_PATH}/auth/register`;
export const EMAIL_VERIFICATION = `${SERVER_URL}/${CONTEXT_PATH}/auth`;
