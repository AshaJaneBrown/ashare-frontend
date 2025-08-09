import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user!: typeof this.userService.user;
  title = 'ashare-ui';
  collapsed = false;

  menuOpen = false; // для мобільного меню

  constructor(
    private authService: AuthService,
    public userService: UserService,
    private router: Router
  ) {
    this.user = this.userService.user;
    
    if (this.authService.isLoggedIn()) {
      this.userService.loadCurrentUser(); // ✅ централізоване завантаження
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.userService.clearCurrentUser();
    this.menuOpen = false;
    this.router.navigateByUrl('/login');
  }

  login() {
    this.menuOpen = false;
    this.router.navigateByUrl('/login');
  }

  register() {
    this.menuOpen = false;
    this.router.navigateByUrl('/register');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
