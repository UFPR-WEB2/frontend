import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-cliente.component.html',
  styleUrl: './navbar-cliente.component.css'
})
export class NavbarClienteComponent {
  funcionalidades = [
    { nome: 'Solicitar Manutenção', link: '../maintenance/index.html' }
  ];

  estados = ['Orçada', 'Aprovada', 'Rejeitada', 'Arrumada', 'Outros estados'];
}
