import { BudgetService } from './../../../services/api/budget.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { CommonModule, DatePipe, CurrencyPipe  } from '@angular/common';
import {
  MaintenanceService,
  MaintenanceResponse,
} from '../../../services/api/maintenance.service';
import { IBudgetResponse } from '../../../models/budget-response.model';
@Component({
  selector: 'app-view-solicitacao',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './view-solicitacao.component.html',
  styleUrl: './view-solicitacao.component.css',
})
export class ViewSolicitacaoComponent {
  id: number | null = null;
  erro: string | null = null;
  servico: MaintenanceResponse | undefined;
  budget: any;
  mostrarInformacoesAtuais: boolean = true;
  valorAlternado: string = "Informações do Conserto";

  constructor(
    private maintenanceService: MaintenanceService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== null) {
      this.budgetService.getBudgetByMaintenanceId(this.id).subscribe({
        next: (data) => {
          this.budget = {
            ...data,
            dataRecuperacao: this.datePipe.transform(data.dataRecuperacao, 'dd/MM/yyyy') || undefined,
            dataOrcamento: this.datePipe.transform(data.dataOrcamento, 'dd/MM/yyyy') || undefined,
            precoOrcado: this.currencyPipe.transform(data.precoOrcado, 'BRL', 'symbol') || undefined,
          };  
        },
        error: (error) => {
          this.erro = error.message;
          console.log('Erro ao carregar orçamento', error);
        }
      });
    } else {
      console.error('ID inválido');
    }
  
    if (this.id) {
      this.maintenanceService.getMaintenanceRecordById(this.id).subscribe({
        next: (data) => {
          console.log(data)
          this.servico = {
            ...data,
            dataConserto: this.datePipe.transform(data.dataConserto, 'dd/MM/yyyy') || undefined,
            dataCriacao: this.datePipe.transform(data.dataCriacao, 'dd/MM/yyyy') || undefined,
            dataFinalizacao: this.datePipe.transform(data.dataFinalizacao, 'dd/MM/yyyy') || undefined,
          };
        },
        error: (error) => {
          this.erro = error.message;
          console.log('Erro ao carregar solicitação', error);
        },
      });
    }
  }

  alternarInformacoes() {
    this.mostrarInformacoesAtuais = !this.mostrarInformacoesAtuais;
    this.valorAlternado = this.mostrarInformacoesAtuais  ? "Informações do Conserto" : "Informações da solicitação"; 
  }
}
