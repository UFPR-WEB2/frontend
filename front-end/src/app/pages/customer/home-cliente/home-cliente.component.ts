import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import {
  MaintenanceService,
  MaintenanceResponse,
} from '../../../services/api/maintenance.service';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, NavbarClienteComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent implements OnInit {
  servicos: MaintenanceResponse[] = [];
  usuarioLogado: any;

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.maintenanceService.getMaintenanceRecords().subscribe({
      next: (data) => {
        console.log(data)
        this.servicos = data.map((servico) => {
          return {
            ...servico,
            dataConserto:
              this.datePipe.transform(servico.dataConserto, 'dd/MM/yyyy') ||
              undefined,
            dataCriacao:
              this.datePipe.transform(servico.dataCriacao, 'dd/MM/yyyy') ||
              undefined,
            dataFinalizacao:
              this.datePipe.transform(servico.dataFinalizacao, 'dd/MM/yyyy') ||
              undefined,
          };
        });
      },
      error: (error) => {
        console.error('Erro ao carregar solicitações', error);
      },
    });
  }

  mostrarOrcamento(id: number | undefined) {
    this.router.navigate([`/cliente/home/orcamento/${id}`]);
  }

  visualizarServico(id: number | undefined) {
    this.router.navigate(['/cliente/home/servico', id]);
  }

  resgatarServico(id: number | undefined) {}

  pagarServico(id: number | undefined) {
    this.router.navigate([`/cliente/home/pagamento/${id}`]);
  }
}
