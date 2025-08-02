import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true, // ✅ standalone компонент
  imports: [CommonModule], // ✅ дає доступ до *ngIf, *ngFor
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
