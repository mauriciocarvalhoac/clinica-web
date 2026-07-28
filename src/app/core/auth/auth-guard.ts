import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from '../../service/login-service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  var token = inject(LoginService);
  var router = inject(Router);

  if (token.getToken()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
