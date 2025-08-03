import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service'; 
import { UserService } from './core/services/user.service';
import { User } from './core/models/user.model'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})

export class AppComponent {
  title = 'ashare-ui';
  currentUser = signal<User | null>(null);

  constructor(private authService: AuthService, 
    private userService: UserService, 
    private router: Router) 
  {    
    if (this.authService.isLoggedIn()) {
      this.userService.getCurrentUser().subscribe({
        next: (user) => this.currentUser.set(user),
        error: () => this.logout() // Якщо токен невалідний — логаут
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  login() {
  this.router.navigateByUrl('/login');
}

register() {
  this.router.navigateByUrl('/register'); // якщо буде така сторінка
}

  isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}
}

