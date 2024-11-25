import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [],
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.css']
})
export class HeaderClienteComponent {
  @Input() titulo: string = 'Manutenção de Equipamentos';
  @Input() nomeCliente: string = 'Nome do Cliente';
  @Input() emailCliente: string = 'emailDoCliente@gmail.com';

  usuarioLogado: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.recuperarUsuarioLogado();
  }

  recuperarUsuarioLogado() {
    const user = localStorage.getItem('user');
    if (user) {
      this.usuarioLogado = JSON.parse(user);
      this.nomeCliente = this.usuarioLogado.name;
      this.emailCliente = this.usuarioLogado.email;
    }
    const role = localStorage.getItem('role');
    if (role) {
      console.log('Role do usuário:', role);
    }
  }

  goToMenu() {
    this.router.navigate(['']);
  }
}
