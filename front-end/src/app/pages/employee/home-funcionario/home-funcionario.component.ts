import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoStorageService } from '../../../services/servico-storage.service';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarFuncionarioComponent } from '../../../material/navbar-funcionario/navbar-funcionario.component';
import { Router } from '@angular/router';
import { MaintenanceService } from '../../../services/api/maintenance.service';

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarFuncionarioComponent, CommonModule],
  templateUrl: './home-funcionario.component.html',
  styleUrls: ['./home-funcionario.component.css'] 
})
export class HomeFuncionarioComponent {
  servicos: any[] = [];
  servicosFiltrados: any[] = [];
  usuarioLogado: any;

  constructor(private servicoStorage: ServicoStorageService, private router: Router, private maintenanceService: MaintenanceService) { }

  recuperarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario); 
    }
  }

  ngOnInit(): void {
    this.recuperarUsuarioLogado();
    this.carregarServicosAberto();
  }

  carregarServicosAberto() {
    this.maintenanceService.getOpenMaintenances().subscribe({
      next: (data) => {
        this.servicos = data;
        this.servicosFiltrados = this.servicos;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
      },
    });
  }

  Efetuaorcamento(id: string) {
    this.router.navigate([`/funcionario/home/efetuar-orcamento/${id}`]);
  }
}
