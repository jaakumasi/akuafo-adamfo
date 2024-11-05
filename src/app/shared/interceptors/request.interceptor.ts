import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE_KEYS, SIGNIN, SIGNUP } from '../constants';
import { UserDetails } from '../types';

const WHITE_LISTED_ENDPOINTS = [SIGNIN, SIGNUP];

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);

  const user: UserDetails = localStorageService.getLocalItem(
    LOCAL_STORAGE_KEYS.USER
  );

  if (req instanceof HttpRequest) {
    const reqClone = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('ngrok-skip-browser-warning', 'skip-browser-warning'),
    });

    if (!WHITE_LISTED_ENDPOINTS.includes(reqClone.url)) {
      reqClone.headers.set('Authorization', `Bearer ${user?.token}`);
    }

    return next(reqClone);
  }

  return next(req);
};
