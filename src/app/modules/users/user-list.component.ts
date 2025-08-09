import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model'; 
import { RouterModule } from '@angular/router'; // 👈 додай це!

@Component({
  selector: 'app-user-list',
  standalone: true, // ✅ standalone компонент
  imports: [CommonModule, RouterModule], // ✅ дає доступ до *ngIf, *ngFor
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
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
