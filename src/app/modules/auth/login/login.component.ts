import { AuthService } from '../../../core/services/auth.service';
import { UserService} from '../../../core/services/user.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.userService.loadCurrentUser(); // 🟢 Оновлюємо currentUser
        this.router.navigateByUrl('/');
      },
      error: (err) => {
      if (err.status === 401 || err.status === 403) {
        this.errorMessage = 'Invalid email or password';
      } else {
        this.errorMessage = 'Something went wrong. Please try again later.';
      }    
    }
    });
  }
}
