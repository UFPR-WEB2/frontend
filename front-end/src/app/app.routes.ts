import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderClienteComponent } from './material/header-cliente/header-cliente.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewEquipmentCategoryComponent } from './pages/employer/view-equipment-category/view-equipment-category.component'; 


export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'login/register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'cliente/home', loadComponent: () => import('./pages/customer/home-cliente/home-cliente.component').then(m => m.HomeClienteComponent) },
  { path: 'cliente/home/solicitarManutencao', loadComponent: () => import('./pages/customer/solic-manutencao-cliente/solic-manutencao-cliente.component').then(m => m.SolicManutencaoClienteComponent) },
  { path: 'view-maintenance', loadComponent: () => import('./pages/employer/view-maintenance/view-maintenance.component').then(m => m.ViewMaintenanceComponent) },
  { path: 'view-equipment-category', component: ViewEquipmentCategoryComponent },
  { path: '**', redirectTo: '' }
];
