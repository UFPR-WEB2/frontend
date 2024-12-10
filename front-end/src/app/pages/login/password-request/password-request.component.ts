// frontend/src/app/pages/login/password-request/password-request.component.ts

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRequestPassword(): void {
    if (!this.email) {
      return;
    }

    this.message = 'Se o email fornecido estiver cadastrado, você receberá um email com a nova senha.';

    this.authService.requestPasswordReset({ email: this.email }).subscribe({
      next: (response) => {
        console.log('Requisição de recuperação de senha enviada:', response);
      },
      error: (err) => {
        console.error('Erro ao enviar requisição de recuperação de senha:', err);
      }
    });

    this.email = '';
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
