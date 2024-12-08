import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [],
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css']
})
export class HeaderClienteComponent {
  @Input() titulo: string = 'Manutenção de Equipamentos';
  nomeCliente: string = '';
  emailCliente: string = '';
  usuarioLogado: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getSession().subscribe({
      next: (response: any) => {
        this.usuarioLogado = response.body;
        this.nomeCliente = this.usuarioLogado?.name || 'Usuário Desconhecido';
        this.emailCliente = this.usuarioLogado?.email || 'Email não disponível';
      },
      error: (error) => {
        console.error('Erro ao obter sessão:', error);
      }
    });
  }

  goToMenu() {
    this.router.navigate(['']);
  }
}
