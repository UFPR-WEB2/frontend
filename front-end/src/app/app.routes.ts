import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderClienteComponent } from './material/header-cliente/header-cliente.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'login/register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'home-cliente', loadComponent: () => import('./pages/home-cliente/home-cliente.component').then(m => m.HomeClienteComponent) },
  { path: '**', redirectTo: '' }
];
