import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-funcionario',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './navbar-funcionario.component.html',
  styleUrl: './navbar-funcionario.component.css'
})
export class NavbarFuncionarioComponent {
  
  funcionalidades = [
    { nome: 'Solicitar Manutenção', link: '/cliente/home/solicitarManutencao' }
  ];

  estados = ['Orçada', 'Aprovada', 'Rejeitada', 'Arrumada', 'Outros estados'];

  filtroSelecionado: string = 'todas';
  dataInicio: string = '';
  dataFim: string = '';

  @Output() filtroAplicado = new EventEmitter<any>();

  aplicarFiltro() {
    this.filtroAplicado.emit({
      filtro: this.filtroSelecionado,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim
    });
  }
}
