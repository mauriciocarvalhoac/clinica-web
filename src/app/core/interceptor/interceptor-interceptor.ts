import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../../service/login-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  var service = inject(LoginService);
  var router = inject(Router);

  const token = service.getToken();
  if (token) {
    console.log(token);
    var clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(clonedRequest);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        service.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};