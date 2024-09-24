import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderClienteComponent } from './header-cliente/header-cliente.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'login/register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: '**', redirectTo: '' }
];
