import { Component } from '@angular/core';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { Router } from '@angular/router';
import {ButtonComponent} from "../material";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderClienteComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private router: Router) {}
  goToRegister() {
    this.router.navigate(['/login/register']);
  }
  goToHomeCliente() {
    this.router.navigate(['/home-cliente']);
  }
}
