    /** Maneja el error de autenticación */
 
  /** Maneja la respuesta exitosa de autenticación */

import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { ProductUser } from '../interfece/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfece/auth.response';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthState = "checking" | "authenticated" | "not-authenticated";
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Auth {

private _authState = signal<AuthState>("checking");
private _user = signal<ProductUser | null>(null);
private _token = signal<string | null>(null);

private http = inject(HttpClient);

checdkStatus(): Signal<AuthState> {
  return this._authState.asReadonly();
}

authStatus = computed<AuthState>(() => {
  if (this._authState() === "checking") {
    return "checking";
  } 
  if (this._user())
    return "authenticated";
  else
    return "not-authenticated";
});
user = computed(() => this._user());
token = computed(() => this._token());

login(email: string, password: string): Observable<boolean> {
  return this.http.post<AuthResponse>(`${baseUrl}/auth/login`,
     { email, password }).pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      }),
      map(() => true) ,
      catchError((error: any) => {
        return of(this.handleAuthError());
      })
    );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logOut();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`)
    .pipe(
      tap((response) => {
        this.handleAuthResponse(response);
      }),
      map(() => true),
      catchError((error: any) => {
        this.handleAuthError();
        return of(false);
      })
    );
  }

    private handleAuthResponse(response: AuthResponse) {
    this._token.set(response.token);
    this._user.set(response.user);
    this._authState.set("authenticated");
    localStorage.setItem('token', response.token);
  }

     private handleAuthError(): boolean {
      this.logOut();
      return false;
    }

  logOut() {
    this._authState.set("not-authenticated");
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
  }
}
