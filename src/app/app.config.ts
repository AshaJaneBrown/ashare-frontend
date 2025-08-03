import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),              // маршрути
    provideHttpClient(
      withFetch(),                    // ✅ fetch API
      withInterceptors([authInterceptor]) // ✅ наш JWT інтерцептор
    )
  ]
};

