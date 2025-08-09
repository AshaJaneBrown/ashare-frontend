import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatSummary {
  id: number;               // id співрозмовника
  username: string;
  lastMessage: string;
  lastMessageTime: string;  // ISO або будь-що — відформатуємо на фронті
}

export interface MessageDto {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string; // або Date — як повертає бек
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  getChats(): Observable<ChatSummary[]> {
    return this.http.get<ChatSummary[]>('/api/chats');
  }

  getMessages(userId: number): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(`/api/chats/${userId}/messages`);
  }

  sendMessage(userId: number, content: string): Observable<void> {
    return this.http.post<void>(`/api/chats/${userId}/messages`, content, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
