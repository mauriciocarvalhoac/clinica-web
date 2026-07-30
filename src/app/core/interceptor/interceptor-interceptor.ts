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
    var clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          service.logout();
          console.log("Desconectado depois de Logado")
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        service.logout();
        console.log("Não conectado ainda")
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};