import { Component } from '@angular/core';
import { HeaderClienteComponent } from './material/header-cliente/header-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ButtonComponent } from './material';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderClienteComponent, RouterOutlet, ButtonComponent, LoginComponent, RegisterComponent]
})
export class AppComponent {
  title = 'Meu App';
  constructor(private router: Router) { }

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
