import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      bio: ['']
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.warn('Form is invalid. Please check the fields.');
      // Optionally, set a validation message property here for UI display
      return;
    }

    const { username, email, password, bio } = this.registerForm.value;
    this.authService.register({
      username: username ?? '',
      email: email ?? '',
      password: password ?? '',
      bio: bio ?? ''
    }).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error('Registration error', err)
    });
  }
}
