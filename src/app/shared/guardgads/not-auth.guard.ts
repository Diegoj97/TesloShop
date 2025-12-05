import { inject, Injectable } from '@angular/core';
import { Router, CanMatch, CanActivate, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../../auth/services/auth';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanMatch, CanActivate {
  private router = inject(Router);
  private authService = inject(Auth);

  private checkAuthStatus(): Observable<boolean | UrlTree> {
    return this.authService.checkStatus().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return this.router.createUrlTree(['/']);
        }
        return true;
      })
    );
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authService.authStatus() === 'authenticated') {
      return this.router.createUrlTree(['/']);
    }
    
    return this.checkAuthStatus();
  }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authService.authStatus() === 'authenticated') {
      return this.router.createUrlTree(['/']);
    }

    return this.checkAuthStatus();
  }
}