import {
  ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorInterceptor } from './core/interceptor/interceptor-interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(NgbModule),
    provideHttpClient(withInterceptors([interceptorInterceptor])),
    provideEnvironmentNgxMask({
      dropSpecialCharacters: true,
    }),
  ],
};
