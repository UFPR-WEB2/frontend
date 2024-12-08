import { BudgetService } from './../../../services/api/budget.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { CommonModule, DatePipe } from '@angular/common';
import {
  MaintenanceService,
  MaintenanceResponse,
} from '../../../services/api/maintenance.service';
import { IBudgetResponse } from '../../../models/budget-response.model';
@Component({
  selector: 'app-view-solicitacao',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './view-solicitacao.component.html',
  styleUrl: './view-solicitacao.component.css',
})
export class ViewSolicitacaoComponent {
  id: number | null = null;
  erro: string | null = null;
  servico: MaintenanceResponse | undefined;
  budget: IBudgetResponse | undefined;

  constructor(
    private maintenanceService: MaintenanceService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.maintenanceService.getMaintenanceRecordById(this.id).subscribe({
      next: (data) => {
        this.servico = {
          ...data,
          dataConserto:
            this.datePipe.transform(data.dataConserto, 'dd/MM/yyyy') || undefined,
          dataCriacao:
            this.datePipe.transform(data.dataCriacao, 'dd/MM/yyyy') || undefined,
          dataFinalizacao:
            this.datePipe.transform(data.dataFinalizacao, 'dd/MM/yyyy') || undefined,
        };
      },
      error: (error) => {
        this.erro = error.message;
        console.log('Erro ao carregar solicitação', error);
      },
    });
    this.budgetService.getBudgetByMaintenanceId(this.id).subscribe({
      next: (data) => {
        this.budget = {...data, 
          dataOrcamento: this.datePipe.transform(data.dataOrcamento, 'dd/MM/yyyy') || undefined,
          dataRejeicao: this.datePipe.transform(data.dataRejeicao, 'dd/MM/yyyy') || undefined,
          dataRecuperacao: this.datePipe.transform(data.dataRecuperacao, 'dd/MM/yyyy') || undefined
        };
      },
      error: (error) => {
        if(error.status === 404) {
          this.budget = undefined;
          return;
        }
      },
    });
  }
}
