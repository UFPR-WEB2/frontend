import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { ServicoStorageService } from '../../services/servico-storage.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../../material';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private servicoStorage: ServicoStorageService
  ) {}

  ngOnInit() {
    this.servicoStorage.initializePerfis();
  }

  goToRegister() {
    this.router.navigate(['/login/register']);
  }

  goToHomeCliente() {
    this.router.navigate(['/cliente/home']);
  }

  goToHomeFuncionario() {
    this.router.navigate(['/funcionario/home']);
  }

  goToPasswordRequest() {
    this.router.navigate(['/login/password-request']);
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert('É necessário preencher todos os campos.');
      return;
    }
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const authResponse = response.body;
        if (authResponse) {
          localStorage.setItem('user', JSON.stringify({
            name: authResponse.name,
            email: authResponse.emai,
            role:authResponse.role
          }));

          if (authResponse.role === 'CUSTOMER') {
            this.goToHomeCliente();
          } else if (authResponse.role === 'EMPLOYEE') {
            this.goToHomeFuncionario();
          }
        }
      },
      error: (err) => {
        alert('Credenciais inválidas');
      }
    });
  }
}
