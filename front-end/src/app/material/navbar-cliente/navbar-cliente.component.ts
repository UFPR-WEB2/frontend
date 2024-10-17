import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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

  estados = ['Orçada', 'Aprovada', 'Rejeitada', 'Arrumada', 'Outros estados'];
}
