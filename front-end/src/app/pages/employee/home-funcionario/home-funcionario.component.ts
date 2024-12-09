import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarFuncionarioComponent } from '../../../material/navbar-funcionario/navbar-funcionario.component';
import { Router } from '@angular/router';
import { MaintenanceService } from '../../../services/api/maintenance.service';

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarFuncionarioComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './home-funcionario.component.html',
  styleUrls: ['./home-funcionario.component.css'],
})
export class HomeFuncionarioComponent {
  servicos: any[] = [];
  servicosFiltrados: any[] = [];
  usuarioLogado: any;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    private datePipe: DatePipe
  ) {}

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
        this.servicos = data.map((servico) => ({
          ...servico,
          dataConserto:
            this.datePipe.transform(
              servico.dataConserto,
              'dd/MM/yyyy -  HH:mm:ss'
            ) || undefined,
          dataCriacao:
            this.datePipe.transform(
              servico.dataCriacao,
              'dd/MM/yyyy -  HH:mm:ss'
            ) || undefined,
          dataFinalizacao:
            this.datePipe.transform(
              servico.dataFinalizacao,
              'dd/MM/yyyy -  HH:mm:ss'
            ) || undefined,
        }));
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
