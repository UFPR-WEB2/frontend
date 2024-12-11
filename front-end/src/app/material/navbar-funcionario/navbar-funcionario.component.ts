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
    { nome: 'HOME', link: '/funcionario/home' },
    { nome: 'Visualizar solicitações', link: '/funcionario/home/visualizacao-solicitacoes' },
    { nome: 'CRUD Categoria', link: '/funcionario/home/crud-categoria' },
    { nome: 'CRUD Funcionário', link: '/funcionario/home/crud-funcionario' },
    { nome: 'Relatório de receitas', link: '/funcionario/home/relatorio-receitas' },
    { nome: 'Relatório de receitas por categoria', link: '/funcionario/home/relatorio-categorias' },
  ];


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
