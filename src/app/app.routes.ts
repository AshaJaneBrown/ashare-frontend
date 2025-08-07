import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },

  {
    path: 'users',
    loadComponent: () =>
      import('./modules/users/user-list.component').then(m => m.UserListComponent),
    canActivate: [authGuard],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register/register.component').then(m => m.RegisterComponent),
  },

  // {
  //   path: 'posts/new',
  //   loadComponent: () =>
  //     import('./modules/posts/post-create.component').then(m => m.PostCreateComponent),
  // },

  {
    path: 'posts',
    loadComponent: () =>
      import('./modules/posts/post-list.component').then(m => m.PostListComponent),
    canActivate: [authGuard],
  }
];

