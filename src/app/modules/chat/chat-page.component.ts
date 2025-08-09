import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  userId!: number;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() { this.userId = Number(this.route.snapshot.paramMap.get('id')); }
}
