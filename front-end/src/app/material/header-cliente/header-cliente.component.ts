import { Component,Input  } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent {
  @Input() titulo: string = 'Manutenção de Equipamentos';
  @Input() nomeCliente: string = 'Nome do Cliente';
  @Input() emailCliente: string = 'emailDoCliente@gmail.com';

  constructor(private router: Router) {}

  usuarioLogado: any;

  ngOnInit() {
    this.recuperarUsuarioLogado();
  }

  recuperarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario); 
    }
  }

  goToMenu() {
    this.router.navigate(['']);
  }
}
