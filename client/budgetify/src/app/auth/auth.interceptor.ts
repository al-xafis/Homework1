import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      const jwt = localStorage.getItem('idToken');
      let user = JSON.parse(localStorage.getItem('user') ?? '');

      const cloned = request.clone({
        headers: request.headers
          .set('Auth', String(jwt))
          .set('Email', user.email),
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
