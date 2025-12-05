import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
constructor(private router: Router) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || '';
    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('authToken');
                this.router.navigate(['/auth/login']);
            }
            return throwError(() => error);
        })
    );
}
}

export const LoginInterceptorProvider = {
provide: HTTP_INTERCEPTORS,
useClass: LoginInterceptor,
multi: true
};