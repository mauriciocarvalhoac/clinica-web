import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log(token);
    var clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(clonedRequest);
  }

  return next(req);
};