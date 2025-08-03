import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
{
  path: '',
  loadComponent: () => import('./modules/users/user-list/user-list.component')
    .then(m => m.UserListComponent),
    canActivate: [authGuard]
},

  {
  path: 'login',
  loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent),
  },

  {
  path: 'register',
  loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
}

];

