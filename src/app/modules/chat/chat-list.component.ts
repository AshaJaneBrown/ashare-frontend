import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatService, ChatSummary } from '../../core/services/chat.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  loading = true;
  chats: ChatSummary[] = [];

  constructor(private chat: ChatService, private router: Router) {}

  ngOnInit() {
    this.chat.getChats().subscribe({
      next: (data) => { this.chats = data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  open(id: number) { this.router.navigate(['/chat', id]); }
}
