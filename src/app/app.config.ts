import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './auth-service/auth.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth-service/auth.interceptor';
import { LoginActivate } from './auth-service/login-activate';
import { CustomErrorHandling } from './error/custom-error-handling';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    { provide: ErrorHandler, useClass: CustomErrorHandling, deps: [MatSnackBar] },
    { provide: AuthService },
    { provide: LoginActivate }
  ]
};
