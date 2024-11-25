import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/api/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../../../material/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-request',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ButtonComponent, CommonModule],
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.css'],
  providers: [AuthService]
})
export class PasswordRequestComponent {
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRequestPassword(): void {
    if (!this.email) {
      this.error = 'Por favor, insira um e-mail válido.';
      this.message = '';
      return;
    }

    this.authService.requestPasswordReset({ email: this.email }).subscribe({
      next: (response) => {
        this.message = 'Uma nova senha foi enviada para seu email.';
        this.error = '';
      },
      error: (err) => {
        this.error = 'Erro ao tentar recuperar a senha. Por favor, tente novamente.';
        this.message = '';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
