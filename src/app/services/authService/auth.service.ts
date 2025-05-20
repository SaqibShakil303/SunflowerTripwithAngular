import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment }     from '../../../environments/environments.prod';
import { isPlatformBrowser }               from '@angular/common';

interface Tokens { accessToken: string; refreshToken: string; }
interface AuthResponse { tokens: Tokens; }

@Injectable({ providedIn: 'root' })
export class AuthService {
   private tokensSubject = new BehaviorSubject<Tokens|null>(null);
  tokens$ = this.tokensSubject.asObservable();

  private jwt = new JwtHelperService();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Only read localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const raw = localStorage.getItem('tokens');
      if (raw) {
        try {
          this.tokensSubject.next(JSON.parse(raw));
        } catch {}
      }
    }
  }

  signup(email: string, password: string, role: string): Observable<any> {
    return this.http
      .post<AuthResponse>(`${environment.apiDomain}/auth/signup`, { email, password, role })
      .pipe(tap(r => this.persistTokens(r.tokens)));
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<AuthResponse>(`${environment.apiDomain}/auth/login`, { email, password })
      .pipe(tap(r => this.persistTokens(r.tokens)));
  }

  private persistTokens(tokens: Tokens) {
    // Only write localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
    }
    this.tokensSubject.next(tokens);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('tokens');
    }
    this.tokensSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.tokensSubject.value?.accessToken;
    return !!token && !this.jwt.isTokenExpired(token);
  }

  getUser(): any {
    const token = this.tokensSubject.value?.accessToken;
    return token ? this.jwt.decodeToken(token) : null;
  }
}
