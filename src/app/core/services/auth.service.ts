import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  // 🔐 Логін користувача
  login(req: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req).pipe(
      tap((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  // 📝 Реєстрація користувача
  register(req: RegisterRequest): Observable<AuthResponse> {
     console.log('Register button clicked'); 
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, req).pipe(
      tap((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  // 🚪 Вийти з акаунту
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // 📦 Отримати токен
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  // ✅ Перевірка: токен є?
  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
}

