import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-cliente.component.html',
  styleUrls: ['./navbar-cliente.component.css']
})
export class NavbarClienteComponent {
  funcionalidades = [
    { nome: 'Solicitar Manutenção', link: '/cliente/home/solicitarManutencao' }
  ];

  estados = ['Todos', 'Orcada', 'Aprovada', 'Rejeitada', 'Arrumada', 'Outros estados'];

  @Output() estadoSelecionado = new EventEmitter<string>();

  onEstadoChange(event: Event) {
    const valor = (event.target as HTMLSelectElement).value;
    this.estadoSelecionado.emit(valor);
  }
}
