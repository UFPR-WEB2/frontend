import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule], // Adicione o RouterModule aqui
  templateUrl: './navbar-cliente.component.html',
  styleUrls: ['./navbar-cliente.component.css']
})
export class NavbarClienteComponent {
  funcionalidades = [
    { nome: 'Solicitar Manutenção', link: '../view-maintenance' }
  ];

  estados = ['Orçada', 'Aprovada', 'Rejeitada', 'Arrumada', 'Outros estados'];
}
