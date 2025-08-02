import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Описуємо інтерфейс користувача (тип даних)
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  bio: string;
}

// Сервіс доступний у всьому застосунку
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
