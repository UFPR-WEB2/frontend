import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { NavbarClienteComponent } from '../../../material/navbar-cliente/navbar-cliente.component';
import { Router } from '@angular/router';
import {
  MaintenanceService,
  MaintenanceResponse,
} from '../../../services/api/maintenance.service';

import { BudgetService } from '../../../services/api/budget.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [
    HeaderClienteComponent,
    NavbarClienteComponent,
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
})
export class HomeClienteComponent implements OnInit {
  servicos: MaintenanceResponse[] = [];
  usuarioLogado: any;
  resgatarModal: Boolean = false;
  resgatarModalId: number | undefined;

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router,
    private datePipe: DatePipe,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.carregarServicos();
  }

  openResgatarModal(id: number | undefined) {
    this.resgatarModal = true;
    this.resgatarModalId = id;
  }

  closeResgatarModal() {
    this.resgatarModal = false;
  }

  carregarServicos(estado?: string) {
    this.maintenanceService.getMaintenanceRecords().subscribe({
      next: (data) => {
        this.servicos = data
          .filter(
            (servico) =>
              !estado ||
              servico.nomeStatus === estado.toUpperCase() ||
              estado === 'todos' ||
              (estado === 'outros estados' &&
                servico.nomeStatus !== 'ORCADA' &&
                servico.nomeStatus !== 'APROVADA' &&
                servico.nomeStatus !== 'REJEITADA' &&
                servico.nomeStatus !== 'ARRUMADA')
          )
          .map((servico) => {
            return {
              ...servico,
              dataConserto:
                this.datePipe.transform(
                  servico.dataConserto,
                  'dd/MM/yyyy HH:mm:ss'
                ) || undefined,
              dataCriacao:
                this.datePipe.transform(
                  servico.dataCriacao,
                  'dd/MM/yyyy HH:mm:ss'
                ) || undefined,
              dataFinalizacao:
                this.datePipe.transform(
                  servico.dataFinalizacao,
                  'dd/MM/yyyy HH:mm:ss'
                ) || undefined,
            };
          });
      },
      error: (error) => {
      },
    });
  }

  filtrarPorEstado(estadoSelecionado: string) {
    console.log('Estado selecionado:', estadoSelecionado);
    this.carregarServicos(estadoSelecionado);
  }

  mostrarOrcamento(id: number | undefined) {
    this.router.navigate([`/cliente/home/orcamento/${id}`]);
  }

  visualizarServico(id: number | undefined) {
    this.router.navigate(['/cliente/home/servico', id]);
  }

  resgatarServico(id: number | undefined) {
    this.budgetService.redeemBudget(id).subscribe({
      next: () => {
        console.log('Serviço resgatado com sucesso');
        this.carregarServicos();
      },
      error: (error) => {
        console.error('Erro ao resgatar serviço', error);
      },
    });
    this.resgatarModal = false;
  }

  pagarServico(id: number | undefined) {
    this.router.navigate([`/cliente/home/pagamento/${id}`]);
  }
}
