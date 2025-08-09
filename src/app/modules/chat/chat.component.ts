import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService, MessageDto } from '../../core/services/chat.service';
import { UserService } from '../../core/services/user.service'; // 👈 додай

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges {
  @Input() userId!: number;
  @ViewChild('thread') threadRef!: ElementRef<HTMLDivElement>; // 👈

  messages: MessageDto[] = [];
  sending = false;
  form: FormGroup; // ← оголошуємо поле без значення
  currentUserId?: number; // 👈 ДОДАЛИ

  constructor(private chat: ChatService, private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    // беремо id поточного користувача із сигналу
    const u = this.userService.user();
    this.currentUserId = u?.id; // якщо ще не завантажився — буде undefined
  
  }

    private scrollToBottom() {
    const el = this.threadRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }


  ngOnChanges() {
    if (!this.userId) return;
    this.chat.getMessages(this.userId).subscribe({
      next: (msgs) => (this.messages = msgs),
    });
  }

  send() {
    if (this.form.invalid || !this.userId) return;
    const content = this.form.value.text!.trim();
    if (!content) return;

    // оптимістично
    const temp: MessageDto = {
      id: -Date.now(),
      senderId: this.currentUserId ?? 0, // 👈 використовуємо поточного користувача
      recipientId: this.userId,
      content,
      timestamp: new Date().toISOString(),
    };
    this.messages = [...this.messages, temp];
     setTimeout(() => this.scrollToBottom()); // 👈 після оптимістичного додавання

    this.sending = true;
    this.chat.sendMessage(this.userId, content).subscribe({
      next: () => { this.form.reset(); this.sending = false; setTimeout(() => this.scrollToBottom()); }, // 👈 після підтвердження
      error: () => { this.sending = false; },
    });
  }
}
