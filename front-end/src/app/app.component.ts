import { Component } from '@angular/core';
import { HeaderClienteComponent } from './header-cliente/header-cliente.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ButtonComponent } from './material';


@Component({
  selector: 'app-root',
  standalone: true,  // Defina o AppComponent como standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderClienteComponent,RouterOutlet, ButtonComponent]  // Adicione o componente standalone nos imports
})
export class AppComponent {
  title = 'Meu App';
  constructor(private router: Router) {}
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToHomeCliente() {
    this.router.navigate(['/home-cliente']);
  }
}
