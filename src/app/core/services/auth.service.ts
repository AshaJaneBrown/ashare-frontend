import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { UserService } from './user.service';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private userService: UserService) {}

  login(req: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req).pipe(
      tap((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
        }
      }),
      
    );
  }

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, req).pipe(
      tap((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
}
