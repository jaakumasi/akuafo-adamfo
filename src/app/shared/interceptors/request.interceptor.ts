import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  if (req instanceof HttpRequest) {
    const reqClone = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('ngrok-skip-browser-warning', 'skip-browser-warning'),
    });

    return next(reqClone);
  }

  return next(req);
};
