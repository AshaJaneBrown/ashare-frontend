import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
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

  {
    path: 'feed',
    loadComponent: () =>
      import('./modules/posts/post-list.component').then(m => m.PostListComponent),
    canActivate: [authGuard],
  },

  {
    path: 'posts',
    loadComponent: () =>
      import('./modules/posts/post-list.component').then(m => m.PostListComponent),
    canActivate: [authGuard],
  },

{
  path: 'chat',
  loadComponent: () =>
    import('./modules/chat/chat-list.component').then(m => m.ChatListComponent),
  canActivate: [authGuard],
},
{
  path: 'chat/:id',
  loadComponent: () =>
    import('./modules/chat/chat-page.component').then(m => m.ChatPageComponent),
  canActivate: [authGuard],
},


];

