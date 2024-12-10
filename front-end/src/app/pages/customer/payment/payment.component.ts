import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderClienteComponent } from '../../../material/header-cliente/header-cliente.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BudgetService } from '../../../services/api/budget.service';
import {
  MaintenanceService,
  MaintenanceResponse,
} from '../../../services/api/maintenance.service';
import { IBudgetResponse } from '../../../models/budget-response.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderClienteComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  id: number | null = null;
  erro: string | null = null;
  servico: MaintenanceResponse | undefined;
  budget: IBudgetResponse | undefined;

  constructor(
    private maintenanceService: MaintenanceService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  /*
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.maintenanceService.getMaintenanceRecordById(this.id).subscribe({
        next: (data) => {
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
  */
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== null) {  // Verifique se id não é null
      this.budgetService.getBudgetByMaintenanceId(this.id).subscribe({
        next: (data) => {
          this.budget = data;  // Supondo que o orçamento esteja vindo na resposta
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
  
  

  efetuarPagamento() {
    if (this.servico && this.budget) {
      const confirmacao = window.confirm(`Confirmar pagamento no valor de R$ ${this.budget.precoOrcado}`);
      if (confirmacao) {
        this.maintenanceService.payMaintenance(this.servico.id!).subscribe({
          next: () => {
            window.alert('Serviço pago com sucesso!');
            this.router.navigate(['/cliente/home']);
          },
          error: (error) => {
            window.alert('Erro ao efetuar o pagamento.');
            console.error('Erro no pagamento', error);
          },
        });
      }
    } else {
      window.alert('Serviço ou orçamento não encontrado.');
    }
  }
}
