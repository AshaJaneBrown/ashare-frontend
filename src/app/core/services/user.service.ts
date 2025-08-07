import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // ✅ Імпорт

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  private currentUserSignal = signal<User | null>(null); // ✅ додали сигнал
  user = this.currentUserSignal.asReadonly(); // ✅ на читання

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  loadCurrentUser() {
    this.getCurrentUser().subscribe({
      next: user => this.currentUserSignal.set(user),
      error: () => this.currentUserSignal.set(null)
    });
  }

  clearCurrentUser() {
    this.currentUserSignal.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
